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
  
    // Load localization files
    loadTemplates(["systems/skate-and-wizards/templates/character-sheet.html"]);
  });
  
  class SkateAndWizardsActor extends Actor {
    // Custom functionality for actors
  }
  
  class SkateAndWizardsItem extends Item {
    // Custom functionality for items
  }
  
  async function preloadHandlebarsTemplates() {
    const templatePaths = [
      "systems/skate-and-wizards/templates/character-sheet.html",
      "systems/skate-and-wizards/templates/item-sheet.html"
    ];
    
    return loadTemplates(templatePaths);
  }
  