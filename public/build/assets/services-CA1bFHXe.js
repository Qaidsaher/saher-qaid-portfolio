import{K as S,r as k,m as E,j as e,L as w,$ as x}from"./app-7e523FSC.js";import{C as L,a as T,b as D,d as F,e as I}from"./card-CrqGRFug.js";import{B}from"./badge-CfiRNGAA.js";import{A as P}from"./app-layout-D710PciM.js";import{B as a}from"./button-DX1lcxT-.js";import{I as m}from"./input-CXNGTfDd.js";import{L as c}from"./label-D4Pgj521.js";import{T as $}from"./textarea-DklnfoE6.js";import{I as d}from"./input-error-0gzVpjgp.js";import{P as z}from"./plus-Co1J-lfO.js";import{C as A}from"./chevron-right-CcSUNiO3.js";import{S as R}from"./square-pen-DNytZ_vp.js";import{T as q}from"./trash-B44VE3J0.js";import"./index-BFLhZdtq.js";import"./dropdown-menu-CumGd39Q.js";import"./index-BoVT7aLE.js";import"./app-logo-icon-7kSI5bS-.js";import"./briefcase-BLY5dM4Q.js";import"./file-text-1jXWwqAk.js";import"./users-PCIl3h8a.js";function ne(){const{services:p}=S().props,h=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Services",href:"/admin/services"}],[t,n]=k.useState(null),{data:l,setData:r,post:j,patch:u,reset:o,errors:i}=E({title:"",description:"",icon:"",link:""}),f=s=>{s.preventDefault(),t?u(`/admin/services/${t.id}`,{onSuccess:()=>{o(),n(null)}}):j("/admin/services",{onSuccess:()=>o()})},v=s=>{n(s),r(s)},g=()=>{o(),n(null)},b=s=>{confirm("Are you sure you want to delete this service?")&&fetch(`/admin/services/${s}`,{method:"DELETE"}).then(()=>{})},N={smartphone:e.jsx("span",{className:"text-primary",children:"📱"}),code:e.jsx("span",{className:"text-primary",children:"💻"}),palette:e.jsx("span",{className:"text-primary",children:"🎨"})},C=p;return e.jsxs(P,{breadcrumbs:h,children:[e.jsx(w,{title:"Services"}),e.jsxs("div",{className:"container px-8 py-12 space-y-8",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between",children:[e.jsxs("div",{className:"text-center md:text-left",children:[e.jsx(B,{variant:"outline",className:"mb-2",children:"Services"}),e.jsx("h1",{className:"text-3xl font-bold",children:"Our Services"}),e.jsx("p",{className:"text-muted-foreground",children:"We offer a range of services to help your business grow."})]}),!t&&e.jsx(x,{href:"#!",onClick:()=>{o(),n(null)},children:e.jsxs(a,{className:"inline-flex items-center gap-2",children:[e.jsx(z,{size:16})," Create Service"]})})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:t?"Edit Service":"Create Service"}),e.jsxs("form",{onSubmit:f,className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(c,{htmlFor:"title",children:"Title"}),e.jsx(m,{id:"title",type:"text",value:l.title,onChange:s=>r("title",s.target.value)}),i.title&&e.jsx(d,{message:i.title})]}),e.jsxs("div",{children:[e.jsx(c,{htmlFor:"icon",children:"Icon (identifier)"}),e.jsx(m,{id:"icon",type:"text",value:l.icon,onChange:s=>r("icon",s.target.value)}),i.icon&&e.jsx(d,{message:i.icon})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx(c,{htmlFor:"description",children:"Description"}),e.jsx($,{id:"description",value:l.description,onChange:s=>r("description",s.target.value)}),i.description&&e.jsx(d,{message:i.description})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx(c,{htmlFor:"link",children:"Link"}),e.jsx(m,{id:"link",type:"text",value:l.link,onChange:s=>r("link",s.target.value)}),i.link&&e.jsx(d,{message:i.link})]}),e.jsxs("div",{className:"md:col-span-2 flex justify-end gap-4",children:[t&&e.jsx(a,{type:"button",onClick:g,variant:"outline",children:"Cancel"}),e.jsx(a,{type:"submit",children:t?"Update":"Create"})]})]})]}),e.jsx("div",{className:"grid gap-8 md:grid-cols-3",children:C.map((s,y)=>e.jsxs(L,{className:"border border-border/40 bg-background hover:shadow-lg transition-all duration-300",children:[e.jsxs(T,{children:[e.jsx("div",{className:"w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4",children:N[s.icon]||e.jsx("span",{children:s.icon})}),e.jsx(D,{children:s.title})]}),e.jsx(F,{children:e.jsx("p",{className:"text-muted-foreground",children:s.description})}),e.jsxs(I,{className:"flex justify-between items-center",children:[e.jsxs(x,{href:s.link,className:"text-primary inline-flex items-center group",children:["Learn more",e.jsx(A,{className:"ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(a,{onClick:()=>v(s),variant:"outline",children:e.jsx(R,{size:16,className:"text-blue-500"})}),e.jsx(a,{onClick:()=>b(s.id),variant:"outline",children:e.jsx(q,{size:16,className:"text-red-500"})})]})]})]},y))})]})]})}export{ne as default};
