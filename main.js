import OBR from "@owlbear-rodeo/sdk";
import { CharacterState } from "./state.js";

let currentTokenId = null;
let characterData = null;

// Map HTML Input Elements to state keys
const fieldsMap = {
    "char-name": "name", "char-class": "class", "char-level": "level",
    "char-spec": "specialization", "char-race": "race",
    "hp-current": "hpCurrent", "hp-total": "hpTotal",
    "mana-current": "manaCurrent", "mana-total": "manaTotal",
    "stat-ac": "ac", "stat-pa": "pa", "stat-ma": "ma",
    "stat-ms": "ms", "stat-init": "initBonus"
};

OBR.onReady(() => {
    // Watch what token the user clicks on the map
    OBR.player.onChange(async (player) => {
        const selection = player.selection;

        if (selection && selection.length === 1) {
            currentTokenId = selection[0];
            document.getElementById("no-token-screen").classList.add("hidden");
            document.getElementById("sheet-screen").classList.remove("hidden");
            renderSheet();
        } else {
            currentTokenId = null;
            document.getElementById("no-token-screen").classList.remove("hidden");
            document.getElementById("sheet-screen").classList.add("hidden");
        }
    });

    setupInputListeners();
});

// Load the data and sync inputs
async function renderSheet() {
    characterData = await CharacterState.loadTokenData(currentTokenId);
    if (!characterData) return;

    // Set standard fields
    for (const [id, key] of Object.entries(fieldsMap)) {
        document.getElementById(id).value = characterData[key] ?? "";
    }

    renderAbilitiesList();
}

// Attach event listeners to catch user edits
function setupInputListeners() {
    for (const [id, key] of Object.entries(fieldsMap)) {
        document.getElementById(id).addEventListener("blur", async (e) => {
            let val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
            await CharacterState.saveField(currentTokenId, key, val);
        });
    }

    document.getElementById("add-ability-btn").addEventListener("click", addNewAbility);
}

// Render the copy-pasted abilities block
function renderAbilitiesList() {
    const container = document.getElementById("abilities-container");
    container.innerHTML = "";

    characterData.abilities.forEach((ability, index) => {
        const card = document.createElement("div");
        card.className = "bg-zinc-800 p-2 rounded border border-zinc-700 relative group space-y-1";
        card.innerHTML = `
      <input type="text" value="${ability.title}" placeholder="Ability Name" class="ability-title w-5/6 bg-transparent font-bold text-sm focus:outline-none focus:border-b border-purple-500">
      <textarea placeholder="Paste ability rules here..." class="ability-desc w-full bg-zinc-900 border border-zinc-700 rounded text-xs p-1 text-zinc-300 resize-none h-16 focus:outline-none focus:border-purple-500">${ability.description}</textarea>
      <button class="delete-ability-btn absolute top-1 right-2 text-zinc-500 hover:text-red-400 text-xs hidden group-hover:block">✕</button>
    `;

        // Listeners inside dynamic ability blocks
        card.querySelector(".ability-title").addEventListener("blur", (e) => updateAbility(index, "title", e.target.value));
        card.querySelector(".ability-desc").addEventListener("blur", (e) => updateAbility(index, "description", e.target.value));
        card.querySelector(".delete-ability-btn").addEventListener("click", () => deleteAbility(index));

        container.appendChild(card);
    });
}

async function addNewAbility() {
    characterData.abilities.push({ title: "", description: "" });
    await CharacterState.saveField(currentTokenId, "abilities", characterData.abilities);
    renderAbilitiesList();
}

async function updateAbility(index, subField, value) {
    characterData.abilities[index][subField] = value;
    await CharacterState.saveField(currentTokenId, "abilities", characterData.abilities);
}

async function deleteAbility(index) {
    characterData.abilities.splice(index, 1);
    await CharacterState.saveField(currentTokenId, "abilities", characterData.abilities);
    renderAbilitiesList();
}