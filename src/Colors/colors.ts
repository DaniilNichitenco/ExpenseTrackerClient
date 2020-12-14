const randomColor = require('random-color');

export const getColor = (index: number) => {
    let color = randomColor(0.99, 0.99);
    
    return ["#000EFF","#2E2E2E","#04B400","#00B3B4",
        "#578900","#7F0000","#989882", "#48C458", 
        "#474AAC", "#612982", "#060407", "#080F43"][index] || color.rgbString();
}