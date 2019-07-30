define(["require", "exports", "./document"], function (require, exports, document_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("Loading simulator");
    class Simulator {
        constructor(playButton, resetButton, destroyButton) {
            this.playButton = playButton;
            this.resetButton = resetButton;
            this.destroyButton = destroyButton;
            this._time = 0;
            this._isPlaying = false;
            const bottomBar = document.querySelector("#mid-menu>div:last-child");
            const queryInput = bottomBar.querySelector("input");
            if (!queryInput)
                throw "time input, play button or reset button not found";
            this.domInput = queryInput;
            this.domInput.value = this._time.toFixed(2);
            this.simulatables = [];
            this.resetButton.enabled = false;
            this.domInput.addEventListener("change", () => {
                if (this.isPlaying)
                    return;
                this.fastForwardTo(Number(this.domInput.value));
            });
            this.playButton.onClick = () => {
                if (!this.isPlaying)
                    this.start();
                else
                    this.stop();
            };
            this.resetButton.onClick = this.reset.bind(this);
        }
        get time() {
            return this._time;
        }
        set time(value) {
            this._time = value;
            this.domInput.value = value.toFixed(2);
            document_1.ObjectSelectionController.propertiesEnabled = value == 0;
            document_1.ObjectCreationController.objectCreatable = value == 0;
            this.resetButton.enabled = value > 0 && !this._isPlaying;
            this.destroyButton.enabled = value == 0 && document_1.ObjectSelectionController.selectedObject != null && document_1.ObjectSelectionController.selectedObject.isFollowable;
        }
        get isPlaying() {
            return this._isPlaying;
        }
        set isPlaying(value) {
            this._isPlaying = value;
            this.domInput.disabled = value;
            if (!value && this.time > 0)
                this.resetButton.enabled = false;
        }
        add(simulatable) {
            this.simulatables.push(simulatable);
        }
        remove(simulatable) {
            const index = this.simulatables.indexOf(simulatable);
            if (index > -1)
                this.simulatables.splice(index, 1);
        }
        start() {
            this.isPlaying = true;
            this.playButton.swapToAltImg();
            this.playButton.swapToAltTitle();
            this.simulate();
        }
        stop() {
            this.isPlaying = false;
            this.playButton.swapToDefaultImg();
            this.playButton.swapToDefaultTitle();
        }
        reset() {
            if (this.isPlaying || this.time == 0)
                return;
            this.time = 0;
            this.simulatables.forEach(simulatable => simulatable.reset());
        }
        fastForwardTo(time) {
            this.reset();
            this.passTime(time);
        }
        passTime(step) {
            this.time += step;
            this.simulatables.forEach(simulatable => simulatable.simulate(step));
        }
        simulate() {
            this.passTime(0.016);
            if (this.isPlaying)
                window.requestAnimationFrame(this.simulate.bind(this));
        }
    }
    exports.default = Simulator;
});
