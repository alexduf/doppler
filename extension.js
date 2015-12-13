const Lang = imports.lang;
const Clutter = imports.gi.Clutter;

const SHADE_COLOR = new Clutter.Color({"red":255, "green":240, "blue":200});

const DopplerState = new Lang.Class({
    Name: 'DopplerState',

    _init: function(actor) {
      this._effect = new Clutter.ColorizeEffect(SHADE_COLOR);
      this._actor = actor;
      this.enabled = true;
    },

    set enabled(enabled) {
      if (enabled) {
        this._actor.add_effect(this._effect);
      } else {
        this._actor.remove_effect(this._effect);
      }
      this._enabled = enabled;
      this._effect.enabled = enabled;
    },

    get enabled() {
      return this._enabled;
    }
});

function _newFrame() {
  global.stage.scale_y = 1.0;
}

var timeline;

function init() {
  if (global.stage && !global.stage._doppler_state) {
    global.stage._doppler_state = new DopplerState(global.stage);
  }
}

function enable() {
  if (global.stage && global.stage._doppler_state) {
    global.stage._doppler_state.enabled = true;

    timeline = new Clutter.Timeline({ duration: 1, repeat_count: -1 });
    timeline.connect('new-frame', _newFrame);
    timeline.start();
  }
}

function disable() {
  if (global.stage && global.stage._doppler_state) {
    global.stage._doppler_state.enabled = false;
    timeline.disconnect('new-frame');
  }
}

