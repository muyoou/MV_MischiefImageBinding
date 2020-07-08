/*
——————————————————————————————————————————————————————————
插件功能：图像状态判断，完成图像绑定，方便直接显示时停立绘
插件输入：NPC名(拼音：liyue)、姿势组的编号(1，2，3...)；
插件输出：显示对应图像到屏幕（对应图像文件：liyue_1_1 ... liyue_1_16，1是事件编号，2是图像状态）
        返回当前衣服状态、姿势状态，到变量500，501
*客户文件名顺序要求：正面：(衣1、衣2、衣3、衣4); 朝左：(衣1、衣2、衣3、衣4); 背面：(衣1、衣2、衣3、衣4); 朝右：(衣1、衣2、衣3、衣4)
——————————————————————————————————————————————————————————
*/

/*
__________________________________________
插件接口：
> MischiefImageBinding : liyue, clothStatusNum(0,1), postureId1(1,99999), postureId2(1,99999)
> setClothStatus : 0-3
> setPostureStatus : 0-1
___________________________________________
插件使用：
____________________________________________
> MischiefImageBinding : liyue, 0, 1, 2
循环：
    1.选项：
        1)选项一：
            > setClothStatus : 3
        2)选项二：
            > setPostureStatus : 1
    2.利用文字框阻塞，可以利用变量500，501
结束
____________________________________________
*/


//这里设置初始化接口参数
/*
   。。。 
   。。。 
   。。。 
   。。。
*/ 


//恶戏图像绑定类
function CLMischiefImageBinding(charaName, clothStatusNum, postureId1, postureId2)
{
    //成员变量
    var m_charaName = "";
    var m_postureId1 = 0;
    var m_postureId2 = 0;
    var m_clothStatus = 0;
    var m_postureStatus = 0;
    var m_clothStatusNum = 0;   //0为16种，1为12种... ...
    var m_imageCharaDirection = [[1, 2, 3, 0], [3, 1, 0, 2], [2, 0, 1, 3], [0, 3, 2, 1]]; //0正面 1背面 2朝右 3朝左

    var m_imageStatus = [[[1, 9, 13, 5], 
                        [2, 10, 14, 6], 
                        [3, 11, 15, 7], 
                        [4, 12, 16, 8]],
                        [[1, 7, 10, 4], 
                        [2, 8, 11, 5], 
                        [3, 9, 12, 6]]];

    //构造函数
    var CLMischiefImageBindingInitiate = function()
    {
        m_charaName = charaName;
        m_clothStatusNum = clothStatusNum;
        m_postureId1 = postureId1;
        m_postureId1 = postureId2;
        showMischiefPicture();
    };
    CLMischiefImageBindingInitiate();

    /*
    功能：设置衣服状态
    输入：衣服状态
    输出：无
    */
    this.setClothStatus = function(clothStatus)//对外功能接口
    {
        m_clothStatus = clothStatus;
        showMischiefPicture();
        getClothStatus();
        getPostureStatus();
    }

    /*
    功能：设置姿势状态
    输入：姿势状态
    输出：无
    */
    this.setPostureStatus = function(postureStatus)//对外功能接口
    {
        m_postureStatus = postureStatus;
        showMischiefPicture();
        getClothStatus();
        getPostureStatus();
    }

    /*
    功能：返回衣服状态到临时变量500
    输入：无
    输出：衣服状态
    */
    this.getClothStatus = function()//对外功能接口
    {
        $gameVriables.setValue(500, m_clothStatus);
    }

    /*
    功能：返回姿势状态到临时变量501
    输入：无
    输出：姿势状态
    */
    this.getPostureStatus = function()//对外功能接口
    {
        $gameVriables.setValue(501, m_clothStatus);
    }
    
    /*
    功能：时停图像朝向判断
    输入：角色及NPC朝向
    输出：NPC立绘朝向：前后右左(待定)
    */
    this.getImageDirections = function(npcEventID)
    {
        //根据玩家和NPC朝向可确定图像朝向
        var playerDirection = $gamePlayer.direction() / 2 - 1; // 2上 8下 4左 6右
        var npcDirection = $event(npcEventID).direction() / 2 - 1; 

        return m_imageCharaDirection[playerDirection][npcDirection];  //0正面 1背面 2朝右 3朝左
    }

    /*
    功能：时停图像状态判断
    输入：衣服状态、姿势状态、朝向状态
    输出：NPC图像状态
    */
    this.getImageStatus = function()
    {
        var imageCharaDirection = getImageDirections();

        //根据衣服、姿势、朝向d，可确定一种状态，默认m_clothStatusNum * 1 *16种 （c为衣服状态, 这里只管1姿势）
        //其他情况可以再定义
        return m_imageStatus[m_clothStatusNum][m_clothStatus][imageCharaDirection];
    }

    /*
    功能：
    输入：角色名、2组姿势编号
    输出：生成对应文件名，显示./img/pictures/下对应文件名图像
    如：输入liyue、姿势编号10；产生文件名liyue_10_X(X取决于衣服、姿势、朝向)
    */
    this.showMischiefPicture = function()//对外接口，核心功能函数
    {
        //1.设置好衣服状态数量
        //2.获取图像的状态，默认16种
        //3.产生文件名：liyue_1_X
        //4.将文件夹下对应图像显示到屏幕上
        var imageStatus = getImageStatus();

        var pictueFileName;
        if(1 == m_postureStatus)
        {
            pictueFileName = s1.concat(m_charaName, "_", m_postureId1, "_", imageStatus);  //调用concat()连接字符串
        }
        else if(2 == m_postureStatus)
        {
            pictueFileName = s1.concat(m_charaName, "_", m_postureId2, "_", imageStatus); 
        }
        
        //显示到屏幕
        $gameScreen.showPicture("1", pictueFileName, 0, 0, 0, 100, 100, 255, 0);
    }
}