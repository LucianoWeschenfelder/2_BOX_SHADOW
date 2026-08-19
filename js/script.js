class BoxShadowGenerator {
    constructor() {
        this.controls = ["horizontal", "vertical", "blur", "spread", "color", "opacity"];

        this.controls.forEach(control => {
            this[control] = document.querySelector(`#${control}`);
            this[`${control}Ref`] = document.querySelector(`#${control}-value`);
        });

        this.inset = document.querySelector("#inset");
        this.previewBox = document.querySelector("#box");
        this.rule = document.querySelector("#rule span");
        this.webkitRule = document.querySelector("#webkit-rule span");
        this.mozRule = document.querySelector("#moz-rule span");
    }

    initialize() {
        this.controls.forEach(control => {
            this[`${control}Ref`].value = this[control].value;
        });

        this.applyRule();
        this.showRule();
    }

    hexToRgba(hex, opacity) {
        let cleanHex = hex.replace("#", "");
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split("").map(c => c + c).join("");
        }

        const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
        const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
        const b = parseInt(cleanHex.substring(4, 6), 16) || 0;

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    applyRule() {
        const rgbColor = this.hexToRgba(this.colorRef.value, this.opacityRef.value);
        const isInset = this.inset.checked ? "inset " : "";

        this.currentRule = `${isInset}${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px ${rgbColor}`;
        this.previewBox.style.boxShadow = this.currentRule;
    }

    showRule() {
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }

    updateValue(type, value) {
        const reference = this[`${type}Ref`];
        if (reference) reference.value = value;

        this.applyRule();
        this.showRule();
    }
}

const boxShadow = new BoxShadowGenerator();
boxShadow.initialize();

// Eventos de Input
boxShadow.controls.forEach((type) => {
    boxShadow[type].addEventListener("input", (e) => boxShadow.updateValue(type, e.target.value));
});

// Evento do Inset
boxShadow.inset.addEventListener("change", () => {
    boxShadow.applyRule();
    boxShadow.showRule();
});

// Copiar 
const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

rulesArea.addEventListener("mousemove", (e) => {
    copyInstructions.style.left = `${e.clientX + 10}px`;
    copyInstructions.style.top = `${e.clientY - 25}px`;
});

rulesArea.addEventListener("click", () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() => {
        copyInstructions.innerText = "Copiado!";

        setTimeout(() => {
            copyInstructions.innerText = "Clique para copiar";
        }, 1500);
    });
});