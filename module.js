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
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_1"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_2"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_3"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_4"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_5"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_6"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_7"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_8"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_9"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_10"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_11"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_1_12")
    ];
    const secondColumn = [
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_1"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_2"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_3"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_4"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_5"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_6"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_7"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_8"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_9"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_10"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_11"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_2_12")
    ];
    const thirdColumn = [
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_1"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_2"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_3"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_4"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_5"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_6"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_7"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_8"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_9"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_10"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_11"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_3_12")
    ];
    const fourthColumn = [
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_1"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_2"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_3"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_4"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_5"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_6"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_7"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_8"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_9"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_10"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_11"),
      game.i18n.localize("SKATE_AND_WIZARDS.SPELL_PART_4_12")
    ];

    function rollD12() {
      return Math.floor(Math.random() * 12);
    }

    const spell = `${firstColumn[rollD12()]} ${secondColumn[rollD12()]} ${thirdColumn[rollD12()]} ${fourthColumn[rollD12()]}`;
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
