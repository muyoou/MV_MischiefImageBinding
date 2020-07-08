/*:
 * @plugindesc TimeStop时的立绘切换
 * @author: Muyoo
 */

(function(){
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args){
        _Game_Interpreter_pluginCommand.call(this, command, args);
        
        switch(command){
            case "display":
                startPlugin()
                break;
            case "back":
                let tmp=$gameVariables.value(1);
                aw_r.visible=true;
                aw_l.visible=true;
                if(tmp==6){
                    $gameVariables.setValue(1,2);
                }else if(tmp==4||tmp==5){
                    $gameVariables.setValue(1,0);
                }
                break;
            case "exit":
                aw_l.visible=false
                aw_r.visible=false
                SceneManager._scene.updateDestination=tmpupdate
                break;
            default: break;
        }
    }

    function startPlugin(){
        aw_r = new Sprite(ImageManager.reservePicture('aw_r'));
        aw_l = new Sprite(ImageManager.reservePicture('aw_l'));
        console.log(Graphics.width+" "+Graphics.height)
        var awPos1=[186,312]
        var awPos2=[578,312]
        aw_l.x=awPos1[0]
        aw_l.y=awPos1[1]
        aw_r.x=awPos2[0]
        aw_r.y=awPos2[1]
        var tmp=$gameVariables.value(1)
        if(tmp==1||tmp==2||tmp==3||tmp==0){
        }else{
            aw_l.visible=false
            aw_r.visible=false
        }
        
        SceneManager._scene.addChild(aw_r)
        SceneManager._scene.addChild(aw_l)
        SceneManager._scene.calcelAnyway=function(){
            if(this.children[2].children[2].active){
                this.children[2].children[2].processCancel()
            }
        }
        tmpupdate=SceneManager._scene.updateDestination
        SceneManager._scene.updateDestination=function(){
            if (TouchInput.isTriggered() || this._touchCount > 0) {
                if (TouchInput.isPressed()) {
                    if (this._touchCount === 0 || this._touchCount >= 15) {
                        Touchx=TouchInput.x
                        Touchy=TouchInput.y
                        let tmp=$gameVariables.value(1)

                        //测试区
                        //console.log(this.children[2].children)

                        if(tmp==0||tmp==1||tmp==2||tmp==3){
                            if(Touchx>awPos1[0]&&Touchx<awPos1[0]+64&&Touchy>awPos1[1]&&Touchy<awPos1[1]+64){
                                if(tmp==3){tmp=0}
                                else{tmp++}
                                $gameVariables.setValue(1,tmp)
                                this.calcelAnyway()
                            }
                            else if(Touchx>awPos2[0]&&Touchx<awPos2[0]+64&&Touchy>awPos2[1]&&Touchy<awPos2[1]+64){
                                if(tmp==0){tmp=3}
                                else{tmp--}
                                $gameVariables.setValue(1,tmp)
                                this.calcelAnyway()
                            }else if(tmp!=2){
                                if(tmp!=2&&Touchx>290&&Touchx<538){
                                    if(Touchy<330){
                                        $gameVariables.setValue(1,4)
                                        aw_r.visible=false
                                        aw_l.visible=false
                                    }else{
                                        $gameVariables.setValue(1,5)
                                        aw_r.visible=false
                                        aw_l.visible=false
                                    }
                                    this.calcelAnyway()
                                }
                            }else if(tmp==2){
                                if(Touchx>290&&Touchx<538&&Touchy>208){
                                    $gameVariables.setValue(1,6)
                                    aw_r.visible=false
                                    aw_l.visible=false
                                    this.calcelAnyway()
                                }
                            }
                        }else{
                        }
                    }
                    this._touchCount++;
                } else {
                    this._touchCount = 0;
                }
            }
        }
        //SceneManager._scene.update=tmpupdate
    }

    
    function timeStopPic() {
        this.initialize.apply(this, arguments);
    }
    timeStopPic.prototype = Object.create(Scene_MenuBase.prototype);
    timeStopPic.prototype.constructor = timeStopPic;
    timeStopPic.prototype.initialize = function() {
        console.log('初始化插件')
        Scene_MenuBase.prototype.initialize.call(this);
    };
    timeStopPic.prototype.create = function() {
        
/*
        console.log('创建插件')
        Scene_MenuBase.prototype.create.call(this);
        this._mypic = new Sprite(ImageManager.reservePicture('c1_a'));
        this.addChild(this._mypic);
        */
    }
    timeStopPic.prototype.start = function() {
        console.log("开始")
        Scene_MenuBase.prototype.start.call(this);
        //SceneManager.clearStack();
        //this.centerSprite(this._mypic);
    }
    timeStopPic.prototype.update = function() {
        console.log('更新')
        Scene_MenuBase.prototype.update.call(this);
    }
    timeStopPic.prototype.centerSprite = function(sprite) {
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    };

})()