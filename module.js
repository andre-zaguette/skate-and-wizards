class SkateAndWizardsActor extends Actor {
  prepareData() {
    super.prepareData();
    const actorData = this.data;
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

class SkateAndWizardsActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["skate-and-wizards", "sheet", "actor"],
      template: "systems/skate-and-wizards/templates/character-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes"}]
    });
  }

  getData() {
    const data = super.getData();
    data.config = CONFIG.skateAndWizards;
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.rollable').click(this._onRoll.bind(this));
  }

  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const roll = new Roll(dataset.roll, this.actor.data.data);
    roll.roll().toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: dataset.label ? `${dataset.label}` : ''
    });
  }
}

Hooks.once('init', async function() {
  console.log('Skate and Wizards | Initializing Skate and Wizards System');

  CONFIG.skateAndWizards = {
    attributeLabels: {
      strength: "Strength",
      dexterity: "Dexterity",
      will: "Will"
    }
  };

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("skate-and-wizards", SkateAndWizardsActorSheet, { makeDefault: true });

  await preloadHandlebarsTemplates();
});

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/skate-and-wizards/templates/character-sheet.html",
    "systems/skate-and-wizards/templates/random-spells.html",
    "systems/skate-and-wizards/templates/random-items.html"
  ];

  return loadTemplates(templatePaths);
}
