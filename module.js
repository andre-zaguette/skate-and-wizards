Hooks.once('init', async function() {
  console.log('Skate and Wizards | Initializing Skate and Wizards System');

  // Define custom Entity classes
  CONFIG.Actor.entityClass = SkateAndWizardsActor;
  CONFIG.Item.entityClass = SkateAndWizardsItem;

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
}
