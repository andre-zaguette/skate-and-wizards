class SkateAndWizardsActor extends Actor {
  prepareData() {
    super.prepareData();
    const actorData = this.data;
    // Initialize attribute data if not present
    if (!actorData.data.attributes) {
      actorData.data.attributes = {
        strength: 0,
        dexterity: 0,
        will: 0
      };
    }
    if (!actorData.data.spells) {
      actorData.data.spells = {
        permanent: ["", "", ""],
        random: ["", "", ""],
        bootleg: ""
      };
    }
    if (!actorData.data.items) {
      actorData.data.items = ["", "", "", ""];
    }
  }

  rollRandomSpell(target) {
    const firstColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_1_1",
      "SKATE_AND_WIZARDS.SPELL_PART_1_2",
      "SKATE_AND_WIZARDS.SPELL_PART_1_3",
      "SKATE_AND_WIZARDS.SPELL_PART_1_4",
      "SKATE_AND_WIZARDS.SPELL_PART_1_5",
      "SKATE_AND_WIZARDS.SPELL_PART_1_6",
      "SKATE_AND_WIZARDS.SPELL_PART_1_7",
      "SKATE_AND_WIZARDS.SPELL_PART_1_8",
      "SKATE_AND_WIZARDS.SPELL_PART_1_9",
      "SKATE_AND_WIZARDS.SPELL_PART_1_10",
      "SKATE_AND_WIZARDS.SPELL_PART_1_11",
      "SKATE_AND_WIZARDS.SPELL_PART_1_12"
    ];
    const secondColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_2_1",
      "SKATE_AND_WIZARDS.SPELL_PART_2_2",
      "SKATE_AND_WIZARDS.SPELL_PART_2_3",
      "SKATE_AND_WIZARDS.SPELL_PART_2_4",
      "SKATE_AND_WIZARDS.SPELL_PART_2_5",
      "SKATE_AND_WIZARDS.SPELL_PART_2_6",
      "SKATE_AND_WIZARDS.SPELL_PART_2_7",
      "SKATE_AND_WIZARDS.SPELL_PART_2_8",
      "SKATE_AND_WIZARDS.SPELL_PART_2_9",
      "SKATE_AND_WIZARDS.SPELL_PART_2_10",
      "SKATE_AND_WIZARDS.SPELL_PART_2_11",
      "SKATE_AND_WIZARDS.SPELL_PART_2_12"
    ];
    const thirdColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_3_1",
      "SKATE_AND_WIZARDS.SPELL_PART_3_2",
      "SKATE_AND_WIZARDS.SPELL_PART_3_3",
      "SKATE_AND_WIZARDS.SPELL_PART_3_4",
      "SKATE_AND_WIZARDS.SPELL_PART_3_5",
      "SKATE_AND_WIZARDS.SPELL_PART_3_6",
      "SKATE_AND_WIZARDS.SPELL_PART_3_7",
      "SKATE_AND_WIZARDS.SPELL_PART_3_8",
      "SKATE_AND_WIZARDS.SPELL_PART_3_9",
      "SKATE_AND_WIZARDS.SPELL_PART_3_10",
      "SKATE_AND_WIZARDS.SPELL_PART_3_11",
      "SKATE_AND_WIZARDS.SPELL_PART_3_12"
    ];
    const fourthColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_4_1",
      "SKATE_AND_WIZARDS.SPELL_PART_4_2",
      "SKATE_AND_WIZARDS.SPELL_PART_4_3",
      "SKATE_AND_WIZARDS.SPELL_PART_4_4",
      "SKATE_AND_WIZARDS.SPELL_PART_4_5",
      "SKATE_AND_WIZARDS.SPELL_PART_4_6",
      "SKATE_AND_WIZARDS.SPELL_PART_4_7",
      "SKATE_AND_WIZARDS.SPELL_PART_4_8",
      "SKATE_AND_WIZARDS.SPELL_PART_4_9",
      "SKATE_AND_WIZARDS.SPELL_PART_4_10",
      "SKATE_AND_WIZARDS.SPELL_PART_4_11",
      "SKATE_AND_WIZARDS.SPELL_PART_4_12"
    ];

    function rollD12() {
      return Math.floor(Math.random() * 12);
    }

    const spell = `${game.i18n.localize(firstColumn[rollD12()])} ${game.i18n.localize(secondColumn[rollD12()])} ${game.i18n.localize(thirdColumn[rollD12()])} ${game.i18n.localize(fourthColumn[rollD12()])}`;
    this.update({[`data.${target}`]: spell});
  }
}

Hooks.once('init', async function() {
  console.log('Skate and Wizards | Initializing Skate and Wizards System');

  // Define custom Entity classes
  CONFIG.Actor.documentClass = SkateAndWizardsActor;
  CONFIG.Item.documentClass = SkateAndWizardsItem;

  // Preload Handlebars templates
  await preloadHandlebarsTemplates();

  // Register custom sheets (if any)
  Actors.registerSheet("skate-and-wizards", SkateAndWizardsActorSheet, { makeDefault: true });
  Items.registerSheet("skate-and-wizards", SkateAndWizardsItemSheet, { makeDefault: true });

  // Add the random spells and items tables to the sidebar
  game.settings.registerMenu("skate-and-wizards", "randomSpellsMenu", {
    name: "Random Spells Table",
    label: "Open Spells Table",
    icon: "fas fa-table",
    type: RandomSpellsTable,
    restricted: false
  });

  game.settings.registerMenu("skate-and-wizards", "randomItemsMenu", {
    name: "Random Items Table",
    label: "Open Items Table",
    icon: "fas fa-table",
    type: RandomItemsTable,
    restricted: false
  });
});

class RandomSpellsTable extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "random-spells-table",
      title: "Random Spells Table",
      template: "systems/skate-and-wizards/templates/random-spells.html",
      width: 600,
      height: 400,
      closeOnSubmit: false
    });
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("#rollSpell").click(this._onRollSpell.bind(this));
  }

  _onRollSpell(event) {
    event.preventDefault();
    const firstColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_1_1",
      "SKATE_AND_WIZARDS.SPELL_PART_1_2",
      "SKATE_AND_WIZARDS.SPELL_PART_1_3",
      "SKATE_AND_WIZARDS.SPELL_PART_1_4",
      "SKATE_AND_WIZARDS.SPELL_PART_1_5",
      "SKATE_AND_WIZARDS.SPELL_PART_1_6",
      "SKATE_AND_WIZARDS.SPELL_PART_1_7",
      "SKATE_AND_WIZARDS.SPELL_PART_1_8",
      "SKATE_AND_WIZARDS.SPELL_PART_1_9",
      "SKATE_AND_WIZARDS.SPELL_PART_1_10",
      "SKATE_AND_WIZARDS.SPELL_PART_1_11",
      "SKATE_AND_WIZARDS.SPELL_PART_1_12"
    ];
    const secondColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_2_1",
      "SKATE_AND_WIZARDS.SPELL_PART_2_2",
      "SKATE_AND_WIZARDS.SPELL_PART_2_3",
      "SKATE_AND_WIZARDS.SPELL_PART_2_4",
      "SKATE_AND_WIZARDS.SPELL_PART_2_5",
      "SKATE_AND_WIZARDS.SPELL_PART_2_6",
      "SKATE_AND_WIZARDS.SPELL_PART_2_7",
      "SKATE_AND_WIZARDS.SPELL_PART_2_8",
      "SKATE_AND_WIZARDS.SPELL_PART_2_9",
      "SKATE_AND_WIZARDS.SPELL_PART_2_10",
      "SKATE_AND_WIZARDS.SPELL_PART_2_11",
      "SKATE_AND_WIZARDS.SPELL_PART_2_12"
    ];
    const thirdColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_3_1",
      "SKATE_AND_WIZARDS.SPELL_PART_3_2",
      "SKATE_AND_WIZARDS.SPELL_PART_3_3",
      "SKATE_AND_WIZARDS.SPELL_PART_3_4",
      "SKATE_AND_WIZARDS.SPELL_PART_3_5",
      "SKATE_AND_WIZARDS.SPELL_PART_3_6",
      "SKATE_AND_WIZARDS.SPELL_PART_3_7",
      "SKATE_AND_WIZARDS.SPELL_PART_3_8",
      "SKATE_AND_WIZARDS.SPELL_PART_3_9",
      "SKATE_AND_WIZARDS.SPELL_PART_3_10",
      "SKATE_AND_WIZARDS.SPELL_PART_3_11",
      "SKATE_AND_WIZARDS.SPELL_PART_3_12"
    ];
    const fourthColumn = [
      "SKATE_AND_WIZARDS.SPELL_PART_4_1",
      "SKATE_AND_WIZARDS.SPELL_PART_4_2",
      "SKATE_AND_WIZARDS.SPELL_PART_4_3",
      "SKATE_AND_WIZARDS.SPELL_PART_4_4",
      "SKATE_AND_WIZARDS.SPELL_PART_4_5",
      "SKATE_AND_WIZARDS.SPELL_PART_4_6",
      "SKATE_AND_WIZARDS.SPELL_PART_4_7",
      "SKATE_AND_WIZARDS.SPELL_PART_4_8",
      "SKATE_AND_WIZARDS.SPELL_PART_4_9",
      "SKATE_AND_WIZARDS.SPELL_PART_4_10",
      "SKATE_AND_WIZARDS.SPELL_PART_4_11",
      "SKATE_AND_WIZARDS.SPELL_PART_4_12"
    ];

    function rollD12() {
      return Math.floor(Math.random() * 12);
    }

    const spell = `${game.i18n.localize(firstColumn[rollD12()])} ${game.i18n.localize(secondColumn[rollD12()])} ${game.i18n.localize(thirdColumn[rollD12()])} ${game.i18n.localize(fourthColumn[rollD12()])}`;
    document.getElementById('spellResult').innerText = spell;
  }
}

class RandomItemsTable extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "random-items-table",
      title: "Random Items Table",
      template: "systems/skate-and-wizards/templates/random-items.html",
      width: 600,
      height: 400,
      closeOnSubmit: false
    });
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("#rollItem").click(this._onRollItem.bind(this));
  }

  _onRollItem(event) {
    event.preventDefault();
    const items = [
      "SKATE_AND_WIZARDS.ITEM_DESC_1",
      "SKATE_AND_WIZARDS.ITEM_DESC_2",
      "SKATE_AND_WIZARDS.ITEM_DESC_3",
      "SKATE_AND_WIZARDS.ITEM_DESC_4",
      "SKATE_AND_WIZARDS.ITEM_DESC_5",
      "SKATE_AND_WIZARDS.ITEM_DESC_6",
      "SKATE_AND_WIZARDS.ITEM_DESC_7",
      "SKATE_AND_WIZARDS.ITEM_DESC_8",
      "SKATE_AND_WIZARDS.ITEM_DESC_9",
      "SKATE_AND_WIZARDS.ITEM_DESC_10",
      "SKATE_AND_WIZARDS.ITEM_DESC_11",
      "SKATE_AND_WIZARDS.ITEM_DESC_12"
    ];

    function rollD12() {
      return Math.floor(Math.random() * 12);
    }

    const item = game.i18n.localize(items[rollD12()]);
    document.getElementById('itemResult').innerText = item;
  }
}

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/skate-and-wizards/templates/character-sheet.html",
    "systems/skate-and-wizards/templates/random-spells.html",
    "systems/skate-and-wizards/templates/random-items.html"
  ];
  
  return loadTemplates(templatePaths);
}
