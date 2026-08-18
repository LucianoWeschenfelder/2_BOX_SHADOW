class BoxShadowGenerator {
    constructor(
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        inset,
        previewBox,
        rule,
        webkitRule,
        mozRule
    ) {
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.spreadRef.value = this.spread.value;
        this.blurRef.value = this.blur.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;

        this.applyRule();
        this.showRule();
    }

    // Converte HEX + Opacidade em RGBA válido para o CSS
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
        // Converte o HEX da cor e o valor de opacidade em um padrão rgba()
        const rgbColor = this.hexToRgba(this.colorRef.value, this.opacityRef.value);

        // Verifica se a checkbox do inset está marcada
        const isInset = this.inset.checked ? "inset " : "";

        // Monta a regra incluindo o inset (se marcado)
        this.previewBox.style.boxShadow = `${isInset}${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px ${rgbColor}`;
        this.currentRule = this.previewBox.style.boxShadow;
    }

    showRule() {
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }

    updateValue(type, value) {
        const reference = this[`${type}Ref`];
        if (reference) {
            reference.value = value;
        }

        this.applyRule();
        this.showRule();
    }
}

// seleção de elementos
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const inset = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
);

boxShadow.initialize();

// eventos
const controls = [
    { input: horizontal, type: "horizontal" },
    { input: vertical, type: "vertical" },
    { input: spread, type: "spread" },
    { input: blur, type: "blur" },
    { input: color, type: "color" },
    { input: opacity, type: "opacity" }
];
controls.forEach(({ input, type }) => {
    input.addEventListener("input", (e) => boxShadow.updateValue(type, e.target.value));
});

// Evento exclusivo do Checkbox Inset
inset.addEventListener("change", () => {
    boxShadow.applyRule();
    boxShadow.showRule();
});