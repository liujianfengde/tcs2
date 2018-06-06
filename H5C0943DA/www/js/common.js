function qd(s){
    s=s.replace(/：/g,':');  
    s=s.replace(/。/g,'.');  
    s=s.replace(/“/g,'"');  
    s=s.replace(/”/g,'"');  
    s=s.replace(/【/g,'[');  
    s=s.replace(/】/g,']');  
    s=s.replace(/《/g,'<');  
    s=s.replace(/》/g,'>');  
    s=s.replace(/，/g,',');  
    s=s.replace(/？/g,'?');  
    s=s.replace(/、/g,',');  
    s=s.replace(/；/g,';');  
    s=s.replace(/（/g,'(');  
    s=s.replace(/）/g,')');  
    s=s.replace(/‘/g,"'");  
    s=s.replace(/’/g,"'");  
    s=s.replace(/『/g,"[");  
    s=s.replace(/』/g,"]");  
    s=s.replace(/「/g,"[");  
    s=s.replace(/」/g,"]");  
    s=s.replace(/﹃/g,"[");  
    s=s.replace(/﹄/g,"]");  
    s=s.replace(/〔/g,"{");  
    s=s.replace(/〕/g,"}");  
    s=s.replace(/—/g,"-");  
    s=s.replace(/·/g,"."); 
    s=s.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,""); 
	return s;
}




// 示例1
//open_soft_keyboard({
//  input: "#username"
//});
//// 示例2
//open_soft_keyboard({
//  input: 'input[value=""]'
//});

/*
 * 默认打开软键盘
 * @param options{
 *   input: '#nickname' // 容器节点
 * }
 * @author 蔡繁荣
 * @version 1.0.3 build 20151226
 */

function open_soft_keyboard(options){
    if(plus.os.name == 'iOS'){
        setTimeout(function(){
            var wv_current = plus.webview.currentWebview().nativeInstanceObject();
            wv_current.plusCallMethod({"setKeyboardDisplayRequiresUserAction":false});
            document.querySelector(options['input']).focus();
        }, 330);
    }else{
        // 因为安卓autofocus只有4.0版本以上才支持，所以这里使用native.js来强制弹出
        setTimeout(function(){
            // 在执行的时候需要让当前webview获取焦点
            var wv_current = plus.android.currentWebview();
            plus.android.importClass(wv_current);
            wv_current.requestFocus();

            var Context = plus.android.importClass("android.content.Context");
            var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
            var main = plus.android.runtimeMainActivity();
            var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.toggleSoftInput(0,InputMethodManager.SHOW_FORCED);
            document.querySelector(options['input']).focus();
        }, 330);
    }
}