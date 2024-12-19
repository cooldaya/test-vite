import { CACHE } from "@/ktJS/CACHE.js";

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        console.log('成功复制:', text);
    } catch (err) {
        console.error('复制失败:', err);
    }
    document.body.removeChild(textArea);
}
const autoClip = (formattedData) => {
    const formattedString = JSON.stringify(formattedData, null, 2);
    fallbackCopyTextToClipboard(formattedString)
}

const container = () => {
    const gui = new dat.GUI({ width: 300 })

    //orbitCamera&orbitControls
    {
        // 创建GUI文件夹和控件
        const orbitCameraFolder = gui.addFolder('orbitCamera&orbitControls');
        const options = {
            consoleLog: () => {
                const position = Object.values(camera.position).map(i => Number(i.toFixed(2)))
                const target = Object.values(orbitControls.target).map(i => Number(i.toFixed(2)))
                autoClip({ position, target });
            }
        }
        //默认打开orbitControls
        // orbitCameraFolder.open();
        const camera = CACHE.container.orbitCamera;
        const orbitControls = CACHE.container.orbitControls;

        orbitCameraFolder.add(camera.position, 'x').step(0.001).name('Position X');
        orbitCameraFolder.add(camera.position, 'y').step(0.001).name('Position Y');
        orbitCameraFolder.add(camera.position, 'z').step(0.001).name('Position Z');

        orbitCameraFolder.add(orbitControls.target, 'x').step(1).name('Target X');
        orbitCameraFolder.add(orbitControls.target, 'y').step(1).name('Target Y');
        orbitCameraFolder.add(orbitControls.target, 'z').step(1).name('Target Z');
        orbitCameraFolder.add(options, 'consoleLog')

        orbitCameraFolder.add(orbitControls, 'autoRotate').name('autoRotate');
        orbitCameraFolder.add(orbitControls, 'autoRotateSpeed', 0, 10, 1).name('autoRotateSpeed');
        orbitCameraFolder.add(orbitControls, 'maxDistance').step(1).name('maxDistance');
        orbitCameraFolder.add(orbitControls, 'minDistance').step(1).name('minDistance');
        orbitCameraFolder.add(orbitControls, 'maxPolarAngle', 0, Math.PI / 2, 0.001).name('maxPolarAngle').onChange((val) => {
            CACHE.container.orbitControls.maxPolarAngle = val;
        })
        orbitCameraFolder.add(orbitControls, 'minPolarAngle', 0, Math.PI / 2, 0.001).name('minPolarAngle').onChange((val) => {
            CACHE.container.orbitControls.minPolarAngle = val;
        })

        orbitCameraFolder.add(CACHE.container.bounds.boundingSphere, 'radius').step(1).name('radius').onChange((val) => {
            CACHE.container.bounds.boundingSphere.radius = val;
        })

        // 监听控制器的end事件触发GUI的显示（该情况下GUI会实时根据场景数据变化，但无法手动输入GUI的参数）
        orbitControls.addEventListener('end', function () {
            gui.updateDisplay(); // 更新GUI显示
        });

        // // 监听控制器的change事件触发GUI的显示（可手动输入参数）
        // orbitControls.addEventListener('change', function () {
        //     gui.updateDisplay(); // 更新GUI显示
        // });
    }

    //directionLights
    {
        const lightFolder = gui.addFolder('directionLights')
        let _index
        const lightParams = {
            directionLights: {
                color: 0xedeacc,
                intensity: 1.0,
                position: [20.3, 70, 40.2],
                mapSize: "高2048",
                mapSize2: 2048,
                near: 10,
                far: 15000,
                bias: -0.001,
                distance: 8000,
                castShadow: false,
                helper: function () {
                    _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
                    if (_index === -1) {
                        const helperGroup = new Bol3D.Group()
                        helperGroup.name = 'helperGroup'
                        const helper = new Bol3D.DirectionalLightHelper(CACHE.container.directionLights[0], 10);
                        const cameraHelper = new Bol3D.CameraHelper(CACHE.container.directionLights[0].shadow.camera, 10);
                        console.log(helper, cameraHelper);
                        helperGroup.add(helper)
                        helperGroup.add(cameraHelper)
                        CACHE.container.scene.add(helperGroup);
                        console.log('添加helper')
                    } else {
                        CACHE.container.scene.children[_index].children.forEach(i => {
                            i.dispose()
                            i = null
                        })
                        CACHE.container.scene.remove(CACHE.container.scene.children[_index])
                        CACHE.container.scene.children[_index].dispose()
                        CACHE.container.scene.children[_index] = null
                        console.log('删除helper')
                    }
                }
            },
            ambientLight: {
                color: '#ffffff',
                intensity: 0
            }
        };

        lightFolder.add(CACHE.container.directionLights[0], 'intensity').step(0.1).min(0).max(10)
        lightFolder
            .addColor(CACHE.container.attrs.lights.directionLights[0], 'color')
            .onChange((val) => {
                CACHE.container.directionLights[0].color.set(val)
            })
            .name('平行光颜色')
        lightFolder.add(CACHE.container.directionLights[0].position, 'x').onChange(val => {
            CACHE.container.directionLights[0].position.x = val
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)
        lightFolder.add(CACHE.container.directionLights[0].position, 'y').onChange(val => {
            CACHE.container.directionLights[0].position.y = val
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)
        lightFolder.add(CACHE.container.directionLights[0].position, 'z').onChange(val => {
            CACHE.container.directionLights[0].position.z = val
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)
        // lightFolder.add(lightParams.directionLights, 'distance').onChange((val) => {
        //     CACHE.container.directionLights[0].shadow.camera.left = -val
        //     CACHE.container.directionLights[0].shadow.camera.right = val
        //     CACHE.container.directionLights[0].shadow.camera.top = val
        //     CACHE.container.directionLights[0].shadow.camera.bottom = -val
        //     CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
        //     CACHE.container.directionLights[0].shadow.needsUpdate = true
        //     _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
        //     if(_index!==-1){
        //         CACHE.container.scene.children[_index].children.forEach(i=>{
        //             i.update()
        //         })
        //     }
        // }).step(1).name('distance(范围)')
        const state = {
            top: 50,
            right: 50,
            bottom: -50,
            left: -50,
            mapSize: 512
        };

        let shadowCamera, shadow
        shadowCamera = CACHE.container.directionLights[0].shadow.camera
        shadow = CACHE.container.directionLights[0].shadow

        lightFolder.add(CACHE.container.directionLights[0].shadow.camera, 'far').onChange(() => {
            CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
            CACHE.container.directionLights[0].shadow.needsUpdate = true
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1).name('far(远端距离)')
        lightFolder.add(CACHE.container.directionLights[0].shadow.camera, 'near').onChange(() => {
            CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
            CACHE.container.directionLights[0].shadow.needsUpdate = true
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1).name('near(近端距离)')
        lightFolder
            .add(CACHE.container.directionLights[0].shadow, 'bias')
            .step(0.0001)
            .onChange(() => {
                CACHE.container.directionLights[0].shadow.needsUpdate = true
            })
            .step(0.0001).name('bias(阴影偏移)')

        lightFolder.add(CACHE.container.directionLights[0], 'castShadow')

        lightFolder.add(shadowCamera, 'top').onChange(function (val) {
            shadowCamera.top = val
            CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
            CACHE.container.directionLights[0].shadow.needsUpdate = true
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)

        lightFolder.add(shadowCamera, 'right').onChange(function (val) {
            shadowCamera.right = val
            CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
            CACHE.container.directionLights[0].shadow.needsUpdate = true
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)

        lightFolder.add(shadowCamera, 'bottom').onChange(function (val) {
            shadowCamera.bottom = val
            CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
            CACHE.container.directionLights[0].shadow.needsUpdate = true
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)

        lightFolder.add(shadowCamera, 'left').onChange(function (val) {
            shadowCamera.left = val
            CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix()
            CACHE.container.directionLights[0].shadow.needsUpdate = true
            _index = CACHE.container.scene.children.findIndex(i => i.name === 'helperGroup')
            if (_index !== -1) {
                CACHE.container.scene.children[_index].children.forEach(i => {
                    i.update()
                })
            }
        }).step(1)

        state.mapSize = shadow.mapSize.width
        lightFolder.add(state, 'mapSize', 0, 16384, 512).onChange(function () {
            shadow.mapSize.width = state.mapSize
            shadow.mapSize.height = state.mapSize
            shadow.map.setSize(state.mapSize, state.mapSize);
        })

        lightFolder.add(lightParams.directionLights, 'helper')
    }

    //ambientLight
    {
        const ambientLight = gui.addFolder('ambientLight')
        ambientLight
            .addColor(CACHE.container.attrs.lights.ambientLight, 'color')
            .onChange((val) => {
                CACHE.container.ambientLight.color.set(val)
            })
            .name('环境光颜色')
        ambientLight.add(CACHE.container.ambientLight, 'intensity', 0, 2).step(0.05)
    }

    //background
    {
        const options = {
            type: ['color', 'texture', 'panorama'],
            EnCoding: ['LinearEncoding', 'sRGBEncoding', 'GammaEncoding'], //3000、3001、3007
        };
        const encodingMap = {
            LinearEncoding: 3000,
            sRGBEncoding: 3001,
            GammaEncoding: 3007,
        };
        const background = gui.addFolder('background');
        background.add(options, 'EnCoding', options.EnCoding).onChange((val) => {
            const { sky } = CACHE.container;
            sky.material.map.encoding = encodingMap[val];
            sky.material.needsUpdate = true;
        });
    }

    //雾
    //线性雾或者指数雾，根据场景是否配置，若都没有配置则初始为指数雾的GUI
    {
        if (!CACHE.container.scene.fog || CACHE.container.scene.fog.isFogExp2) {
            // 创建指数雾
            const options = {
                enable: !!CACHE.container.scene.fog,
                color: new Bol3D.Color(0x9dabb7),
                density: 0.0005,
            }
            let color, density;
            const fogFolderAddOption = () => {
                color = fogFolder.addColor({ color: options.color.getHex() }, 'color').onChange((value) => {
                    CACHE.container.scene.fog.color.setHex(value);
                });
                density = fogFolder.add(options, 'density', 0, 0.01).step(0.00001).onChange((value) => {
                    CACHE.container.scene.fog.density = value;
                });
            }
            const fogFolder = gui.addFolder('Fog');

            fogFolder.add(options, 'enable').onChange((value) => {
                if (value) {
                    CACHE.container.scene.fog = new Bol3D.FogExp2(options.color, options.density);
                    fogFolderAddOption()
                } else {
                    CACHE.container.scene.fog = null;
                    fogFolder.remove(color);
                    fogFolder.remove(density);
                }
            });
            if (options.enable) {
                fogFolderAddOption()
            }

        } else {
            //线性雾
            const fogFolder = gui.addFolder('linearFog');
            let fogSettings = {
                color: 0x92a9af,
                near: 191,
                far: 815,
                enable: CACHE.container.scene.fog.isFog,
            };
            let color, near, far;

            const fogFolderAddOption = () => {
                color = fogFolder.addColor(fogSettings, 'color').onChange(value => {
                    CACHE.container.scene.fog.color.set(value);
                });
                near = fogFolder.add(fogSettings, 'near', 100, 2000).onChange(value => {
                    CACHE.container.scene.fog.near = value;
                });
                far = fogFolder.add(fogSettings, 'far', 100, 5000).onChange(value => {
                    CACHE.container.scene.fog.far = value;
                });
            }

            fogFolder.add(fogSettings, 'enable').onChange(value => {
                console.log("🚀 ~ value:", value)
                if (value) {
                    CACHE.container.scene.fog = new Bol3D.Fog(fogSettings.color, fogSettings.near, fogSettings.far);
                    fogFolderAddOption()
                } else {
                    CACHE.container.scene.fog = null;
                    fogFolder.remove(color);
                    fogFolder.remove(near);
                    fogFolder.remove(far);
                }
            });
            if (fogSettings.enable) {
                fogFolderAddOption()
            }
        }
    }

    // Bloom
    {
        const bloomFolder = gui.addFolder('Bloom')
        const bloomParams = {
            enable: false,
            threshold: 0.12,
            strength: 0.13,
            radius: 0.21,
        };
        const bloomPass = CACHE.container.bloomPass;
        bloomPass.threshold = bloomParams.threshold;
        bloomPass.strength = bloomParams.strength;
        bloomPass.radius = bloomParams.radius;

        bloomFolder.add(bloomParams, 'enable').onChange((value) => {
            bloomPass.enabled = value;
        });

        bloomFolder.add(bloomParams, 'threshold', 0.0, 1.0).onChange(function (value) {
            bloomPass.threshold = Number(value);
        }).name('阈值');

        bloomFolder.add(bloomParams, 'strength', 0.0, 10.0).onChange(function (value) {
            bloomPass.strength = Number(value);
        }).name('强度');

        bloomFolder.add(bloomParams, 'radius', 0.0, 1.0).step(0.01).onChange(function (value) {
            bloomPass.radius = Number(value);
        }).name('半径');
    }

    //transform
    {
        const transform = gui.addFolder('transform')
        const options = {
            enable: false,
            transformMode: ['translate', 'rotate', 'scale'],
            consoleLog: () => {
                const position = Object.values(CACHE.container.transformControl.object.position).map(i => Number(i.toFixed(2)))

                autoClip(position)
            }
        }
        const controls = CACHE.container.transformControl

        const boxG = new Bol3D.BoxGeometry(0.01, 0.01, 0.01)
        const boxM = new Bol3D.MeshBasicMaterial({ color: 0xff0000 })
        const box = new Bol3D.Mesh(boxG, boxM)
        box.name = 'transformBox'

        let X, Y, Z, transformMode, Log;
        transform.add(options, 'enable').onChange((val) => {
            if (!val) {
                CACHE.container.scene.remove(box)
                controls.detach()
                //删除transform中的GUI
                transform.remove(transformMode)
                transform.remove(X)
                transform.remove(Y)
                transform.remove(Z)
                transform.remove(Log)
            } else {
                //用target的位置作为Box的初始位置
                const position = CACHE.container.orbitControls.target
                box.position.set(position.x, position.y, position.z)
                CACHE.container.scene.add(box)
                controls.attach(box)
                transformMode = transform
                    .add(options, 'transformMode', options.transformMode)
                    .onChange((val) => controls.setMode(val))
                X = transform
                    .add(box.position, 'x')
                    .onChange((val) => (box.position.x = val))
                    .name('X')
                Y = transform
                    .add(box.position, 'y')
                    .onChange((val) => (box.position.y = val))
                    .name('Y')
                Z = transform
                    .add(box.position, 'z')
                    .onChange((val) => (box.position.z = val))
                    .name('Z')
                Log = transform
                    .add(options, 'consoleLog')
            }
        })
    }
}

//模型动画GUI
class modelAnimationGUI {
    constructor() {
        //gui
        this.gui = new dat.GUI({ width: 400 })
        this.modelFolder = this.gui.addFolder('Model');
        this.animationFolder = this.gui.addFolder('Animation');
        this.sceneAnimations = container.sceneAnimations;
        //modelGolder options
        this.modelNames = Object.keys(this.sceneAnimations)
        this.curModel = this.modelNames[0]
        this.speed = 1;
        this.showHelper = true
        this.playAll = false
        //animationFolder options
        this.animationOptions = {}
        this.initModelFolder()
        this.updateModelFolder(this.modelNames[0])
        this.injectRender()
    }
    initModelFolder() {
        this.modelFolder.add(this, 'curModel', this.modelNames).onChange((model) => {
            this.curModel = model
            this.updateModelFolder(model);
        });
        this.modelFolder.add(this, 'speed', 0.1, 5, 0.1).onChange((speed) => {
            this.sceneAnimations[this.curModel].forEach(animation => {
                animation.mixer._actions[0].timeScale = speed
            })
        })
        this.modelFolder.add(this, 'showHelper', this.showHelper).onChange((value) => {
            Object.values(this.animationOptions).forEach(i => {
                i.helperArr.forEach(j => {
                    j.visible = value
                })
            })
        })
        this.modelFolder.add(this, "playAll", this.playAll).onChange((value) => {
            this.animationFolder.__controllers.forEach(i => (i.property === "play" && i.setValue(value)))
        })
    }
    updateModelFolder(model) {
        for (let i = this.animationFolder.__controllers.length - 1; i >= 0; i--) {
            this.animationFolder.remove(i)
        }
        this.sceneAnimations[model].forEach(animation => {
            let name = animation.clip.name
            let time = animation.clip.duration
            this.animationOptions[name] = {
                time: 0,
                play: false,
                helperArr: []
            }
            let meshArr = animation.mixer._bindings.map(i => i.binding.node)
            meshArr.forEach(i => {
                let helper = new Bol3D.BoxHelper(i, 0xff0000);
                helper.material.depthTest = false;
                helper.renderOrder = 2
                container.scene.add(helper);
                this.animationOptions[name].helperArr.push(helper)
            })
            this.animationFolder.add(this.animationOptions[name], "play").name(name + "-play").onChange(value => {
                animation.mixer._actions[0].paused = !value;
                let checkPlayAll = this.animationFolder.__controllers.filter(i => i.property === "play").every(i => i.__checkbox.checked)
                this.modelFolder.__controllers.forEach(i => (i.property === "playAll" && (i.__checkbox.checked = checkPlayAll) && (i.object
                    .playAll = checkPlayAll)))
            })
            this.animationFolder.add(this.animationOptions[name], "time", 0, time, 0.1).name(name + "-time").onChange(value => {
                animation.mixer._actions[0].time = value;
            })
        })
    }
    injectRender() {
        container.renderer.setAnimationLoop(null)
        container.renderer.setAnimationLoop(() => {
            container.animation()
            Object.values(this.animationOptions).forEach(i => {
                i.helperArr.forEach(j => j.update())
            })
        })
    }
}


export const GUI = {
    container,
    modelAnimationGUI
}
