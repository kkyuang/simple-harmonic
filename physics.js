//상수 정의
//화면비 관련 상수
const x_min = -4;
const x_max = 4;
const y_min = -3;
const y_max = 3;

const screen_x = 400;
const screen_y = 300;

const deltatime = 0.01;

//절대 시간
var SHM_time = 0

//그래프 관련 상수
const g_x_min = 0
const g_x_max = 20
const g_y_min = -4
const g_y_max = 4
const g_screen_x = 400;
const g_screen_y = 300;

$(document).ready(() => {
    console.log("gg")
    var canvas = $("#shm_cvs")[0];
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        //playSHM();
    }
})

var SHMinterval
var isStarted = false, isPaused = false
function playSHM(){
    if(isStarted) return 0;
    if(!isPaused) SHM_time = 0
    isStarted = true
    var canvas = $("#shm_cvs")[0];
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        //물리량 변수
        var acc = Number($("#a_input").val());
        var velocity = Number($("#v_input").val());
        var x = Number($("#x_input").val());
        var m = Number($("#m_input").val());
        var k = Number($("#k_input").val());
        var r = Number($("#r_input").val());

        SHMinterval = setInterval(SHMintervalF, deltatime*1000)

        function SHMintervalF(){
            screenClear(canvas);
            drawCircle(ctx, x, 0)
            pointGraph(SHM_time, x)
            acc = (-(k*x) - (velocity)*r*deltatime)/m
            velocity += acc * deltatime
            x += velocity * deltatime
            SHM_time += deltatime
            $("#a_input").val(Math.round(acc*100)/100)
            $("#v_input").val(Math.round(velocity*100)/100)
            $("#x_input").val(Math.round(x*100)/100)
            $("#time").html(Math.round(SHM_time*100) / 100)
        }
    }
}

function stopSHM(){
    isStarted = false

    clearInterval(SHMinterval)
    var graph = $("#graph_cvs")[0];
    var canvas = $("#shm_cvs")[0];
    screenClear(graph);
    screenClear(canvas);
}

function pauseSHM(){
    if(!isPaused){
        isPaused = true
        clearInterval(SHMinterval)
        $("#pause_btn").html("재시작!")
    }
    else{
        isStarted = false
        playSHM()
        isPaused = false
        $("#pause_btn").html("일시 정지!")
    }
}


//화면삭제 테스트
$(document).mousedown(() => {
    var canvas = $("#shm_cvs")[0];
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");
        //screenClear(ctx, canvas);
    }
})

//실제 좌표를 화면 좌표로 변환
function cvt_RtoS(x, y){
    xcv = ((x - x_min ) / (x_max - x_min)) * screen_x
    ycv = (1 - ((y - y_min ) / (y_max - y_min))) * screen_y
    return {x: xcv, y: ycv}
}

//원 그리기
function drawCircle(ctx, x, y){
    ctx.fillStyle = "rgb(200,0,0)";
    pnt = cvt_RtoS(x, y);
    ctx.arc(pnt.x, pnt.y, 20, 0, 2*Math.PI);
    ctx.fill();
}

//화면 초기화
function screenClear(cnvs){
    var ctx = cnvs.getContext("2d");
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    ctx.beginPath();
}

//그래프 그리기
function pointGraph(x, y){
    var graph = $("#graph_cvs")[0];
    var g_ctx = graph.getContext("2d");
    xcv = ((x - g_x_min ) / (g_x_max - g_x_min)) * g_screen_x
    ycv = (1 - ((y - g_y_min ) / (g_y_max - g_y_min))) * g_screen_y
    g_ctx.arc(xcv, ycv, 2, 0, 2*Math.PI);
    g_ctx.fill();
    g_ctx.beginPath();
}