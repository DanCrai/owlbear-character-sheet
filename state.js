import OBR from "@owlbear-rodeo/sdk";

const METADATA_KEY = "com.yourstudio.ttrpg_sheet/character_data";

// Empty baseline model matching your specs
export const createEmptySheet = () => ({
    name: "", class: "", level: 1, specialization: "", race: "",
    hpCurrent: 10, hpTotal: 10,
    manaCurrent: 5, manaTotal: 5,
    ac: 10, pa: 0, ma: 0, ms: 30, initBonus: 0,
    abilities: [] // Array of { id, title, description }
});

export const CharacterState = {
    // Save specific field modifications directly to the token
    saveField: async (tokenId, fieldName, value) => {
        if (!tokenId) return;
        await OBR.scene.items.updateItems([tokenId], (items) => {
            for (let item of items) {
                if (!item.metadata[METADATA_KEY]) {
                    item.metadata[METADATA_KEY] = createEmptySheet();
                }
                item.metadata[METADATA_KEY][fieldName] = value;
            }
        });
    },

    // Pull all data belonging to a single token
    loadTokenData: async (tokenId) => {
        if (!tokenId) return null;
        const items = await OBR.scene.items.getItems([tokenId]);
        if (!items.length) return null;

        const data = items[0].metadata[METADATA_KEY];
        return data ? data : createEmptySheet();
    }
};