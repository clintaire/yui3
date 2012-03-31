YUI.add("uploader-flash",function(g){var b=g.substitute,f=g.Uploader.Queue,c=g.ClassNameManager.getClassName,d="uploader",e=c(d,"selectfiles-button");function a(h){a.superclass.constructor.apply(this,arguments);}g.UploaderFlash=g.extend(a,g.Widget,{_buttonState:"up",_buttonFocus:false,_swfContainerId:null,_swfReference:null,queue:null,_tabElementBindings:null,initializer:function(){this._swfContainerId=g.guid("uploader");this._swfReference=null;this.queue=null;this._buttonState="up";this._buttonFocus=null;this._tabElementBindings=null;this.publish("fileselect");this.publish("uploadstart");this.publish("fileuploadstart");this.publish("uploadprogress");this.publish("totaluploadprogress");this.publish("uploadcomplete");this.publish("alluploadscomplete");this.publish("uploaderror");this.publish("mouseenter");this.publish("mouseleave");this.publish("mousedown");this.publish("mouseup");this.publish("click");},renderUI:function(){var i=this.get("boundingBox"),h=this.get("contentBox"),k=this.get("selectFilesButton");i.setStyle("position","relative");k.setStyles({width:"100%",height:"100%"});h.append(k);h.append(g.Node.create(b(a.FLASH_CONTAINER,{swfContainerId:this._swfContainerId})));var j=g.one("#"+this._swfContainerId);var l={version:"10.0.45",fixedAttributes:{wmode:"transparent",allowScriptAccess:"always",allowNetworking:"all",scale:"noscale"}};this._swfReference=new g.SWF(j,this.get("swfURL"),l);},bindUI:function(){this._swfReference.on("swfReady",function(){this._setMultipleFiles();this._setFileFilters();this._triggerEnabled();this.after("multipleFilesChange",this._setMultipleFiles,this);this.after("fileFiltersChange",this._setFileFilters,this);this.after("enabledChange",this._triggerEnabled,this);},this);this._swfReference.on("fileselect",this._updateFileList,this);this.after("tabElementsChange",this._attachTabElements);this._attachTabElements();this._swfReference.on("mouseenter",function(){this.fire("mouseenter");this._setButtonClass("hover",true);if(this._buttonState=="down"){this._setButtonClass("active",true);}},this);this._swfReference.on("mouseleave",function(){this.fire("mouseleave");this._setButtonClass("hover",false);this._setButtonClass("active",false);},this);this._swfReference.on("mousedown",function(){this.fire("mousedown");this._buttonState="down";this._setButtonClass("active",true);},this);this._swfReference.on("mouseup",function(){this.fire("mouseup");this._buttonState="up";this._setButtonClass("active",false);},this);this._swfReference.on("click",function(){this.fire("click");this._buttonFocus=true;this._setButtonClass("focus",true);g.one("body").focus();this._swfReference._swf.focus();},this);},_attachTabElements:function(i){if(this.get("tabElements")!==null&&this.get("tabElements").from!==null&&this.get("tabElements").to!==null){if(this._tabElementBindings!==null){this._tabElementBindings.from.detach();this._tabElementBindings.to.detach();this._tabElementBindings.tabback.detach();this._tabElementBindings.tabforward.detach();this._tabElementBindings.focus.detach();this._tabElementBindings.blur.detach();}else{this._tabElementBindings={};}var j=g.one(this.get("tabElements").from);var h=g.one(this.get("tabElements").to);this._tabElementBindings.from=j.on("keydown",function(k){if(k.keyCode==9&&!k.shiftKey){k.preventDefault();this._swfReference._swf.setAttribute("tabindex",0);this._swfReference._swf.setAttribute("role","button");this._swfReference._swf.setAttribute("aria-label",this.get("selectButtonLabel"));this._swfReference._swf.focus();}},this);this._tabElementBindings.to=h.on("keydown",function(k){if(k.keyCode==9&&k.shiftKey){k.preventDefault();this._swfReference._swf.setAttribute("tabindex",0);this._swfReference._swf.setAttribute("role","button");this._swfReference._swf.setAttribute("aria-label",this.get("selectButtonLabel"));this._swfReference._swf.focus();}},this);this._tabElementBindings.tabback=this._swfReference.on("tabback",function(k){this._swfReference._swf.blur();setTimeout(function(){j.focus();},30);},this);this._tabElementBindings.tabforward=this._swfReference.on("tabforward",function(k){this._swfReference._swf.blur();setTimeout(function(){h.focus();},30);},this);this._tabElementBindings.focus=this._swfReference._swf.on("focus",function(k){this._buttonFocus=true;this._setButtonClass("focus",true);},this);this._tabElementBindings.blur=this._swfReference._swf.on("blur",function(k){this._buttonFocus=false;this._setButtonClass("focus",false);},this);}else{if(this._tabElementBindings!==null){this._tabElementBindings.from.detach();this._tabElementBindings.to.detach();this._tabElementBindings.tabback.detach();this._tabElementBindings.tabforward.detach();this._tabElementBindings.focus.detach();this._tabElementBindings.blur.detach();}}},_setButtonClass:function(h,i){if(i){this.get("selectFilesButton").addClass(this.get("buttonClassNames")[h]);}else{this.get("selectFilesButton").removeClass(this.get("buttonClassNames")[h]);}},_setFileFilters:function(){if(this._swfReference&&this.get("fileFilters")!==null){this._swfReference.callSWF("setFileFilters",[this.get("fileFilters")]);}},_setMultipleFiles:function(){if(this._swfReference){this._swfReference.callSWF("setAllowMultipleFiles",[this.get("multipleFiles")]);}},_triggerEnabled:function(){if(this.get("enabled")){this._swfReference.callSWF("enable");this._swfReference._swf.setAttribute("aria-disabled","false");this._setButtonClass("disabled",false);}else{this._swfReference.callSWF("disable");this._swfReference._swf.setAttribute("aria-disabled","true");this._setButtonClass("disabled",true);}},_updateFileList:function(k){g.one("body").focus();this._swfReference._swf.focus();var j=k.fileList,m=[],i=[],h=this._swfReference;g.each(j,function(o){var n={};n.id=o.fileId;n.name=o.fileReference.name;n.size=o.fileReference.size;n.type=o.fileReference.type;n.dateCreated=o.fileReference.creationDate;n.dateModified=o.fileReference.modificationDate;n.uploader=h;m.push(n);});g.each(m,function(n){i.push(new g.FileFlash(n));});this.fire("fileselect",{fileList:i});
var l=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?l.concat(i):i);},_uploadEventHandler:function(h){switch(h.type){case"file:uploadstart":this.fire("fileuploadstart",h);break;case"file:uploadprogress":this.fire("uploadprogress",h);break;case"uploaderqueue:totaluploadprogress":this.fire("totaluploadprogress",h);break;case"file:uploadcomplete":this.fire("uploadcomplete",h);break;case"uploaderqueue:alluploadscomplete":this.queue=null;this.fire("alluploadscomplete",h);break;case"uploaderqueue:uploaderror":this.fire("uploaderror",h);}},upload:function(l,j,m){var k=j||this.get("uploadURL"),i=m||this.get("postVarsPerFile"),h=l.get("id");i=i.hasOwnProperty(h)?i[h]:i;if(l instanceof g.FileFlash){l.on("uploadstart",this._uploadStartHandler,this);l.on("uploadprogress",this._uploadProgressHandler,this);l.on("uploadcomplete",this._uploadCompleteHandler,this);l.on("uploaderror",this._uploadErrorHandler,this);l.startUpload(k,i,this.get("fileFieldName"));}},uploadAll:function(h,i){this.uploadThese(this.get("fileList"),h,i);},uploadThese:function(l,i,k){if(!this.queue){var j=i||this.get("uploadURL"),h=k||this.get("postVarsPerFile");this.queue=new f({simUploads:this.get("simLimit"),errorAction:this.get("errorAction"),fileFieldName:this.get("fileFieldName"),fileList:l,uploadURL:j,perFileParameters:h});this.queue.on("uploadstart",this._uploadEventHandler,this);this.queue.on("uploadprogress",this._uploadEventHandler,this);this.queue.on("totaluploadprogress",this._uploadEventHandler,this);this.queue.on("uploadcomplete",this._uploadEventHandler,this);this.queue.on("alluploadscomplete",this._uploadEventHandler,this);this.queue.on("alluploadscancelled",function(m){this.queue=null;},this);this.queue.on("uploaderror",this._uploadEventHandler,this);this.queue.startUpload();this.fire("uploadstart");}}},{FLASH_CONTAINER:"<div id='{swfContainerId}' style='position:absolute; top:0px; left: 0px; margin: 0; padding: 0; border: 0; width:100%; height:100%'></div>",SELECT_FILES_BUTTON:"<button type='button' class='yui3-button' tabindex='-1'>{selectButtonLabel}</button>",TYPE:"flash",NAME:"uploader",ATTRS:{appendNewFiles:{value:true},buttonClassNames:{value:{"hover":"yui3-button-hover","active":"yui3-button-active","disabled":"yui3-button-disabled","focus":"yui3-button-selected"}},enabled:{value:true},errorAction:{value:"continue",validator:function(i,h){return(i===f.CONTINUE||i===f.STOP||i===f.RESTART_ASAP||i===f.RESTART_AFTER);}},fileFilters:{value:null},fileFieldName:{value:"Filedata"},fileList:{value:[]},multipleFiles:{value:false},postVarsPerFile:{value:{}},selectButtonLabel:{value:"Select Files"},selectFilesButton:{valueFn:function(){return g.Node.create(b(g.UploaderFlash.SELECT_FILES_BUTTON,{selectButtonLabel:this.get("selectButtonLabel")}));}},simLimit:{value:2,validator:function(i,h){return(i>=2&&i<=5);}},swfURL:{valueFn:function(){var h=g.Env.cdn+"uploader/assets/flashuploader.swf";if(g.UA.ie>0){return(h+"?t="+g.guid("uploader"));}return h;}},tabElements:{value:null},uploadURL:{value:""}}});g.UploaderFlash.Queue=f;},"@VERSION@",{requires:["swf","widget","substitute","base","cssbutton","node","event-custom","file-flash","uploader-queue"]});