// https://fossies.org/linux/three.js/examples/webgl2_materials_texture2darray.html
var VolumeSliceRenderShader = {
    vertexShader: [
        "uniform vec2 size;",
        "     out vec2 vUv;",
        "",
        "    void main() {",
        "",
        "         gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "         vUv.xy = position.xy / size + 0.5;",
        "         vUv.y = 1.0 - vUv.y; // original data is upside down",
        "",
        "     }",
    ].join("\n"),
    fragmentShader: [
        "     precision highp float;",
        "     precision highp int;",
        "     precision highp sampler2DArray;",
        "     uniform float u_opacity;",
        "     uniform float u_window;",
        "     uniform float u_level;",
        "     uniform bool u_seg;",
        "",
        "     uniform sampler2DArray diffuse;",
        "     in vec2 vUv;",
        "     uniform int depth;",
        "",
        "     out vec4 outColor;",
        "",
        "     void main() {",
        "         ",
        "         float val = texture(diffuse,vec3(vUv,depth)).r;",
        "         if(u_seg){",
        "           if(val >= 1.0)" +
        "               outColor = vec4(vec3(0.98, 0.73, 0.11), u_opacity);",
        "           else if(val >= 0.99 && val < 1.0)" +
        "               outColor = vec4(vec3(0.58, 0.11, 0.47), u_opacity);",
        "           else if(val >= 0.01 && val < 0.99)" +
        "               outColor = vec4(vec3(0.29, 0.54, 0.78), u_opacity);",
        "           else" +
        "               outColor = vec4(0,0,0,0);",
        "         }else{",
        "           if(val < (u_level - u_window/2.0))",
        "               outColor = vec4(0,0,0,0);",
        "           else if(val > (u_level + u_window/2.0))",
        "                outColor = vec4(0,0,0,0);",
        "           else {",
        "                val = (val - (u_level - u_window/2.0)) * 1.0/u_window;",
        "                outColor = vec4(vec3(val,val,val)*1.5, u_opacity);",
        "           }",
        "         }",
        "     }",
    ].join("\n")
};

export {VolumeSliceRenderShader};
