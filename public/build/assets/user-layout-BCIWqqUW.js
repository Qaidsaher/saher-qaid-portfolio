import{r as o,j as e,u as M,K as v,$ as i}from"./app-7e523FSC.js";import{c as b,B as j,b as f}from"./button-DX1lcxT-.js";import{e as C,f as S,g as T,i as w,j as y,k as m,X as D}from"./dropdown-menu-CumGd39Q.js";import{M as h,S as x,a as k}from"./sun-CaPsvfZy.js";import{G as E}from"./github-DgXXffxJ.js";import{L as I,T as A}from"./twitter-BarsZaXJ.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],_=b("Menu",z);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]],$=b("Palette",P),q=()=>typeof window>"u"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches,L=s=>{const n=s==="dark"||s==="system"&&q();document.documentElement.classList.toggle("dark",n)},B=()=>typeof window>"u"?null:window.matchMedia("(prefers-color-scheme: dark)"),G=()=>{const s=localStorage.getItem("appearance");L(s||"system")};function F(){var n;const s=localStorage.getItem("appearance")||"system";L(s),(n=B())==null||n.addEventListener("change",G)}function H({children:s}){return o.useEffect(()=>{F()},[]),e.jsx(e.Fragment,{children:s})}function Q(){const[s,n]=o.useState(!1),[l,t]=o.useState("blue"),[c,d]=o.useState("light");if(o.useEffect(()=>{n(!0);const r=localStorage.getItem("theme"),p=localStorage.getItem("color-theme");r&&(d(r),document.documentElement.setAttribute("data-theme",r)),p&&(t(p),g(p))},[]),!s)return null;const a=[{name:"Blue",value:"blue",color:"bg-blue-500"},{name:"Purple",value:"purple",color:"bg-purple-500"},{name:"Green",value:"green",color:"bg-green-500"},{name:"Amber",value:"amber",color:"bg-amber-500"},{name:"Rose",value:"rose",color:"bg-rose-500"},{name:"Teal",value:"teal",color:"bg-teal-500"}];function g(r){document.documentElement.classList.remove("theme-blue","theme-purple","theme-green","theme-amber","theme-rose","theme-teal"),document.documentElement.classList.add(`theme-${r}`),localStorage.setItem("color-theme",r),t(r)}function u(r){localStorage.setItem("theme",r),d(r),document.documentElement.setAttribute("data-theme",r)}return e.jsxs(C,{children:[e.jsx(S,{asChild:!0,children:e.jsxs(j,{variant:"ghost",size:"icon",className:"rounded-full",children:[c==="dark"?e.jsx(h,{className:"h-[1.2rem] w-[1.2rem]"}):e.jsx(x,{className:"h-[1.2rem] w-[1.2rem]"}),e.jsx("span",{className:"sr-only",children:"Toggle theme"})]})}),e.jsxs(T,{align:"end",className:"w-56",children:[e.jsx(w,{children:"Appearance"}),e.jsx(y,{}),e.jsxs(m,{onClick:()=>u("light"),children:[e.jsx(x,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Light"})]}),e.jsxs(m,{onClick:()=>u("dark"),children:[e.jsx(h,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Dark"})]}),e.jsxs(m,{onClick:()=>u("system"),children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-4 w-4",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",ry:"2"}),e.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),e.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}),e.jsx("span",{children:"System"})]}),e.jsx(y,{}),e.jsxs(w,{className:"flex items-center",children:[e.jsx($,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Color Theme"})]}),e.jsx("div",{className:"grid grid-cols-3 gap-1 p-2",children:a.map(r=>e.jsxs("button",{className:`flex flex-col items-center justify-center rounded-md p-2 hover:bg-muted ${l===r.value?"border-2 border-primary":""}`,onClick:()=>g(r.value),title:r.name,children:[e.jsx("div",{className:`h-5 w-5 rounded-full ${r.color}`}),e.jsx("span",{className:"mt-1 text-xs",children:r.name})]},r.value))})]})]})}function R({className:s="",...n}){const{appearance:l,updateAppearance:t}=M(),c=()=>{switch(l){case"dark":return e.jsx(h,{className:"h-5 w-5"});case"light":return e.jsx(x,{className:"h-5 w-5"});default:return e.jsx(k,{className:"h-5 w-5"})}};return e.jsx("div",{className:s,...n,children:e.jsxs(C,{children:[e.jsx(S,{asChild:!0,children:e.jsxs(j,{variant:"ghost",size:"icon",className:"h-9 w-9 rounded-md",children:[c(),e.jsx("span",{className:"sr-only",children:"Toggle theme"})]})}),e.jsxs(T,{align:"end",children:[e.jsx(m,{onClick:()=>t("light"),children:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(x,{className:"h-5 w-5"}),"Light"]})}),e.jsx(m,{onClick:()=>t("dark"),children:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(h,{className:"h-5 w-5"}),"Dark"]})}),e.jsx(m,{onClick:()=>t("system"),children:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(k,{className:"h-5 w-5"}),"System"]})})]})]})})}const N=[{name:"Home",href:"/"},{name:"Projects",href:route("projects.index")},{name:"Articles",href:route("articles.index")},{name:"Skills",href:route("skills.index")},{name:"Experience",href:route("experiences.index")},{name:"Services",href:route("services.index")},{name:"Contact",href:route("contact")}];function U(){const{website:s}=v().props,[n,l]=o.useState(!1),[t,c]=o.useState(!1),d=typeof window<"u"?window.location.pathname:"/";return o.useEffect(()=>{const a=()=>{l(window.scrollY>10)};return window.addEventListener("scroll",a),()=>window.removeEventListener("scroll",a)},[]),e.jsxs("header",{className:f("sticky top-0 z-50 w-full transition-all duration-300",n?"glass-nav":"bg-transparent"),children:[e.jsxs("div",{className:"max-w-7xl mx-auto px-6 flex h-16 items-center justify-between ",children:[e.jsx(i,{href:"/",className:"flex items-center space-x-2",children:e.jsx("span",{className:"text-xl font-bold",children:(s==null?void 0:s.websiteName)??"SaherQ Dev"})}),e.jsxs("nav",{className:"hidden md:flex items-center space-x-6",children:[N.map(a=>e.jsx(i,{href:a.href,className:f("text-sm font-medium transition-colors hover:text-primary",d===a.href?"text-primary":"text-muted-foreground"),children:a.name},a.href)),e.jsx("div",{children:e.jsx(R,{})})]}),e.jsxs("div",{className:"flex md:hidden items-center space-x-2",children:[e.jsx(Q,{}),e.jsx(j,{variant:"ghost",size:"icon",onClick:()=>c(!t),"aria-label":"Toggle menu",children:t?e.jsx(D,{className:"h-6 w-6"}):e.jsx(_,{className:"h-6 w-6"})})]})]}),t&&e.jsx("div",{className:"md:hidden glass-nav py-4",children:e.jsx("nav",{className:"max-w-7xl mx-auto px-4 flex flex-col space-y-4",children:N.map(a=>e.jsx(i,{href:a.href,className:f("text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md",d===a.href?"bg-primary/10 text-primary":"text-muted-foreground"),onClick:()=>c(!1),children:a.name},a.href))})})]})}function Y(){const{website:s}=v().props;return e.jsx("footer",{className:"glass-footer py-6 md:py-8",children:e.jsxs("div",{className:"max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4",children:[e.jsx("div",{className:"flex flex-col items-center md:items-start",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:["© ",new Date().getFullYear(),"  ",(s==null?void 0:s.websiteName)??"SaherQ Dev",". All rights reserved."]})}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs(i,{href:(s==null?void 0:s.socialLinks.github)??"https://www.linkedin.com/in/saher-qaid-470735261/",onClick:n=>{n.preventDefault();const l=(s==null?void 0:s.socialLinks.github)??"https://www.linkedin.com/in/saher-qaid-470735261/";setTimeout(()=>{window.open(l,"_blank","noopener,noreferrer")},300)},className:"text-muted-foreground hover:text-primary transition-colors",children:[e.jsx(E,{className:"h-5 w-5 transition-transform transform hover:translate-x-1"}),e.jsx("span",{className:"sr-only",children:"GitHub"})]}),e.jsxs(i,{href:(s==null?void 0:s.socialLinks.linkedin)??"https://www.linkedin.com/in/saher-qaid-470735261/",onClick:n=>{n.preventDefault();const l=(s==null?void 0:s.socialLinks.linkedin)??"https://www.linkedin.com/in/saher-qaid-470735261/";setTimeout(()=>{window.open(l,"_blank","noopener,noreferrer")},300)},className:"text-muted-foreground hover:text-primary transition-colors",children:[e.jsx(I,{className:"h-5 w-5 transition-transform transform hover:translate-x-1"}),e.jsx("span",{className:"sr-only",children:"LinkedIn"})]}),e.jsxs(i,{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer",className:"text-muted-foreground hover:text-primary transition-colors",children:[e.jsx(A,{className:"h-5 w-5"}),e.jsx("span",{className:"sr-only",children:"Twitter"})]})]})]})})}function O({children:s,breadcrumbs:n}){return e.jsx(H,{children:e.jsxs("div",{className:"flex min-h-screen flex-col ",children:[e.jsx(U,{}),e.jsx("main",{className:"flex-1",children:s}),e.jsx(Y,{})]})})}export{$ as P,O as U};
