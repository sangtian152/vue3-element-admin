import{d as V,r as c,a as m,u as C,b as d,o as E,c as U,e as u,f as s,w as n,g as S,h as D,i as I,v as R,p as b,j as N,_ as k}from"../js2/index-3543d08f.js";const f=r=>(b("data-v-83ace33c"),r=r(),N(),r),q={class:"login-container"},A={class:"login-main"},P=f(()=>u("h3",{class:"title"},"\u7528\u6237\u767B\u5F55",-1)),T=S(" \u767B\u5F55 "),j=f(()=>u("p",{class:"footer"},[u("span",null,"\u7528\u6237\u540D\uFF1Aadmin"),u("span",null,"\u5BC6\u7801\uFF1A123456")],-1)),L=V({__name:"index",setup(r){const v=D(),g=I(),p=c(),t=m({username:"admin",password:"123456"}),i=c(!1),w=C(),F=m({username:[{validator:(a,e,o)=>{R(e)?o():o(new Error("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7528\u6237\u540D"))},trigger:"blur"}],password:[{validator:(a,e,o)=>{e.length<6?o(new Error("\u5BC6\u7801\u4E0D\u5C0F\u4E8E6\u4F4D")):o()},trigger:"blur"}]});let h={};const y=a=>{if(!a)return;let e=v.query.redirect;a.validate(async o=>{if(o)i.value=!0,await w.login(t),g.push({path:e||"/",query:h}),setTimeout(()=>{i.value=!1},.5*1e3);else return!1})};return(a,e)=>{const o=d("el-input"),_=d("el-form-item"),x=d("el-button"),B=d("el-form");return E(),U("div",q,[u("div",A,[P,s(B,{ref_key:"loginFormRef",ref:p,model:t,rules:F},{default:n(()=>[s(_,{prop:"username"},{default:n(()=>[s(o,{modelValue:t.username,"onUpdate:modelValue":e[0]||(e[0]=l=>t.username=l)},null,8,["modelValue"])]),_:1}),s(_,{prop:"password"},{default:n(()=>[s(o,{type:"password",modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=l=>t.password=l)},null,8,["modelValue"])]),_:1}),s(_,null,{default:n(()=>[s(x,{loading:i.value,type:"primary",style:{width:"100%"},onClick:e[2]||(e[2]=l=>y(p.value))},{default:n(()=>[T]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"]),j])])}}});const G=k(L,[["__scopeId","data-v-83ace33c"]]);export{G as default};
//# sourceMappingURL=index-82fba8bd.js.map