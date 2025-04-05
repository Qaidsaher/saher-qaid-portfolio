import{m as g,j as e,L as x}from"./app-CvFJx_F7.js";import{B as h}from"./button-DVSv5keM.js";import{I as d}from"./input-DRu8dsmV.js";import{L as m}from"./label-BOGrb1H7.js";import{T as u}from"./textarea-D9d5Xnif.js";import{A as j}from"./app-layout-CrZNnGY6.js";import{I as i}from"./input-error-DdJtVbvX.js";import{M as b}from"./multi-input-DsRwvKJ2.js";import{L as f}from"./loader-circle-ePsAsDID.js";import"./index-DMqwLZB6.js";import"./index-NBviKt90.js";import"./dropdown-menu-BjTqZSk3.js";import"./app-logo-icon-OJP8soNu.js";import"./briefcase-Ds8aUonx.js";import"./file-text-B_uuA7fw.js";import"./users-D5HMEUSS.js";import"./chevron-right-CJuhAO9Z.js";const v=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Articles",href:"/admin/articles"},{title:"Create Article",href:"/admin/articles/create"}];function k(){const{data:l,setData:r,post:o,processing:s,errors:t,reset:c}=g({title:"",excerpt:"",publish_date:"",readTime:"",categories:[],image:null}),p=a=>{a.target.files&&a.target.files[0]&&r("image",a.target.files[0])},n=a=>{a.preventDefault(),o(route("admin.articles.store"),{preserveState:!0,onSuccess:()=>{c()}})};return e.jsxs(j,{breadcrumbs:v,children:[e.jsx(x,{title:"Create Article"}),e.jsxs("div",{className:"max-w-3xl mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-6 text-gray-800",children:"Create New Article"}),e.jsxs("form",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",onSubmit:n,encType:"multipart/form-data",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(m,{htmlFor:"title",children:"Title"}),e.jsx(d,{id:"title",type:"text",value:l.title,onChange:a=>r("title",a.target.value),placeholder:"Article title",disabled:s}),t.title&&e.jsx(i,{message:t.title})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(m,{htmlFor:"publish_date",children:"Publish Date"}),e.jsx(d,{id:"publish_date",type:"date",value:l.publish_date,onChange:a=>r("publish_date",a.target.value),disabled:s}),t.publish_date&&e.jsx(i,{message:t.publish_date})]}),e.jsxs("div",{className:"grid gap-2 col-span-1 md:col-span-2",children:[e.jsx(m,{htmlFor:"excerpt",children:"Excerpt"}),e.jsx(u,{id:"excerpt",value:l.excerpt,onChange:a=>r("excerpt",a.target.value),placeholder:"Article excerpt",disabled:s}),t.excerpt&&e.jsx(i,{message:t.excerpt})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(m,{htmlFor:"readTime",children:"Read Time (minutes)"}),e.jsx(d,{id:"readTime",type:"number",value:l.readTime,onChange:a=>r("readTime",Number(a.target.value)),placeholder:"Estimated read time in minutes",disabled:s}),t.readTime&&e.jsx(i,{message:t.readTime})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(m,{htmlFor:"image",children:"Article Image"}),e.jsx(d,{id:"image",type:"file",onChange:p,disabled:s}),t.image&&e.jsx(i,{message:t.image})]}),e.jsxs("div",{className:"grid gap-2 col-span-1 md:col-span-2",children:[e.jsx(b,{label:"Categories",values:l.categories,onChange:a=>r("categories",a),placeholder:"Enter a category"}),t.categories&&e.jsx(i,{message:t.categories})]}),e.jsx("div",{className:"col-span-1 md:col-span-2",children:e.jsxs(h,{type:"submit",className:"w-full mt-4",disabled:s,children:[s&&e.jsx(f,{className:"h-4 w-4 animate-spin mr-2"}),"Create Article"]})})]})]})]})}export{k as default};
