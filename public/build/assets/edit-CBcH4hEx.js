import{m as u,j as e,L as x}from"./app-CvFJx_F7.js";import{A as h}from"./app-layout-CrZNnGY6.js";import{B as j}from"./button-DVSv5keM.js";import{I as o}from"./input-DRu8dsmV.js";import{L as d}from"./label-BOGrb1H7.js";import{T as f}from"./textarea-D9d5Xnif.js";import{I as n}from"./input-error-DdJtVbvX.js";import{L as g}from"./loader-circle-ePsAsDID.js";import"./index-NBviKt90.js";import"./dropdown-menu-BjTqZSk3.js";import"./index-DMqwLZB6.js";import"./app-logo-icon-OJP8soNu.js";import"./briefcase-Ds8aUonx.js";import"./file-text-B_uuA7fw.js";import"./users-D5HMEUSS.js";import"./chevron-right-CJuhAO9Z.js";function U({award:t}){const{data:a,setData:i,put:l,processing:m,errors:r}=u({name:t.name,issuer:t.issuer,date:t.date||"",description:t.description||""}),p=s=>{s.preventDefault(),l(route("admin.awards.update",t.id))},c=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Awards",href:"/admin/awards"},{title:"Edit Award",href:`/admin/awards/${t.id}/edit`}];return e.jsxs(h,{breadcrumbs:c,children:[e.jsx(x,{title:"Edit Award"}),e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Edit Award"}),e.jsxs("form",{onSubmit:p,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(d,{htmlFor:"name",children:"Award Name"}),e.jsx(o,{id:"name",type:"text",value:a.name,onChange:s=>i("name",s.target.value),placeholder:"Enter award name"}),r.name&&e.jsx(n,{message:r.name})]}),e.jsxs("div",{children:[e.jsx(d,{htmlFor:"issuer",children:"Issuer"}),e.jsx(o,{id:"issuer",type:"text",value:a.issuer,onChange:s=>i("issuer",s.target.value),placeholder:"Enter issuer name"}),r.issuer&&e.jsx(n,{message:r.issuer})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx(d,{htmlFor:"date",children:"Date"}),e.jsx(o,{id:"date",type:"date",value:a.date,onChange:s=>i("date",s.target.value)}),r.date&&e.jsx(n,{message:r.date})]}),e.jsxs("div",{children:[e.jsx(d,{htmlFor:"description",children:"Description"}),e.jsx(f,{id:"description",value:a.description,onChange:s=>i("description",s.target.value),placeholder:"Enter award description"}),r.description&&e.jsx(n,{message:r.description})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(j,{type:"submit",disabled:m,children:[m&&e.jsx(g,{className:"w-4 h-4 animate-spin mr-2"}),"Update Award"]})})]})]})]})}export{U as default};
