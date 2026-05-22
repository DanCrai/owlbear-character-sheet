import OBR from "@owlbear-rodeo/sdk";

const METADATA_KEY = "com.yourstudio.ttrpg_sheet/character_data";

export const createEmptySheet = () => ({
    name: "", class: "", level: 1, specialization: "", race: "",
    hpCurrent: 10, hpTotal: 10,
    manaCurrent: 5, manaTotal: 5,
    ac: 10, pa: 0, ma: 0, ms: 30, initBonus: 0,
    // New Attributes Block
    str: 10, dex: 10, con: 10, int: 10, wis: 10, will: 10, cha: 10,
    abilities: []
});

export const CharacterState = {
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

    loadTokenData: async (tokenId) => {
        if (!tokenId) return null;
        const items = await OBR.scene.items.getItems([tokenId]);
        if (!items.length) return null;

        const data = items[0].metadata[METADATA_KEY];
        return data ? data : createEmptySheet();
    }
};