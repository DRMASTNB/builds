export const systemConfig = {
    "version":1,
    "dracoLibUrl": "./lib/js/dracolib/",
    "inSignageUrl": "./lib/resource/etc/in.png",
    "outSignageUrl": "./lib/resource/etc/out.png",
    "baseUrl": "./lib/resource/wall/baseAlarm.png",
    "moveUrl": "./lib/resource/wall/move.png",
    "selectEffect": "./lib/resource/etc/waikuang.glb",
    "smokeImg": "./lib/resource/smoke/texture-smoke.png",
    "workerjsUrl": "./lib/js/worker.js",
    "waterImg": "./lib/resource/water/waternormals.png",
    "adsorptionModelUrl": "./lib/resource/label/magnet.png",
    "cameraConfig": {
        "minDistance": 1,
        "maxDistance": 500,
        "maxPolarAngle": 10
    },
    "cursorValue": {
        "meshTouch": "pointer",
        "default": "default"
    },
    "clipConfig": {
        "maxClipY": {
            "主楼": 253.95
        },
        "minClipY": -11,
        "speed": 4,
        "needHideMesh": []
    },
    "focusColors": [
        4294965760,
        16711680,
        4294354178
    ],
    "pointLightProperty": {
        "color": 16777211,
        "intensity": 2,
        "distance": 4,
        "decay": 1,
        "shadow": false,
        "shadowMapSize": 512,
        "addHelper": false
    },
    "templatePointLightType": "pointLight",
    "autoRoamConfig": {
        "speed": 50,
        "eyeHeight": 2.35,
        "reduceVisualHeight": 0.2
    },
    "spriteConfig": {
        "fontSize": 60,
        "borderThickness": 1,
        "scale": [
            50,
            50,
            50
        ]
    },
    "outLineConfig": {
        "edgeStrength": 10,
        "edgeGlow": 0.5,
        "edgeThickness": 2,
        "pulsePeriod": 0,
        "visibleEdgeColor": 1197794,
        "hiddenEdgeColor": 1197794,
        "isMutex": false,
        "isHF": true
    },
    "energyConfig": {
        "colorMap": [
            [
                0,
                732516
            ],
            [
                0.25,
                7051977
            ],
            [
                0.5,
                16756833
            ],
            [
                0.75,
                16671263
            ],
            [
                1,
                12332590
            ]
        ],
        "min": 0,
        "max": 100,
        "segment": 32
    },
    "elevatorSpeed": 200,
    "arrowSpeed": 0.005,
    "autoRotateSpeed": 0.0010726646259971648,
    "showPercentageToFocusObject": 0.5,
    "pickEnableLayers": [5],
    "directionLightShadowProperty":{
        "top":1000,
        "bottom":-1000,
        "left":-1000,
        "right":1000,
        "far":3500,
        "bias":-0.00023
    },
    "isGlow": false,
    "glowParams": {
        "bloomStrength": 2.5,
        "bloomThreshold": 0,
        "bloomRadius": 1
    },
    "moveValue": [
        {
        "x": -5000,
        "y": -5000,
        "z": -5000
        },
        {
        "x": 5000,
        "y": 5000,
        "z": 5000
        }
    ],
    "openProgressBar":false,
    "isLogarithmicDepthBuffer": false,
    "enablekey":{
        "enable":true,
        "speed": 0.01,
        "keys": {
        "FORWARD": "ArrowUp",
        "BACK": "ArrowDown",
        "LEFT": "ArrowLeft",
        "RIGHT": "ArrowRight"
        }
    },
    "noReuseModelNames":[]
}
