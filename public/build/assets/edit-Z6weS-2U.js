import{K as C,m as D,r as h,j as e,L as P}from"./app-CvFJx_F7.js";import{B as F}from"./button-DVSv5keM.js";import{I as c}from"./input-DRu8dsmV.js";import{L as o}from"./label-BOGrb1H7.js";import{T as g}from"./textarea-D9d5Xnif.js";import{A as M}from"./app-layout-CrZNnGY6.js";import{I as a}from"./input-error-DdJtVbvX.js";import{M as u}from"./multi-input-DsRwvKJ2.js";import{D as z}from"./date-picker-DMLak64O.js";import{D as E,f as p}from"./date-picker-with-range-Bcwh2xzP.js";import{L}from"./loader-circle-ePsAsDID.js";import"./index-DMqwLZB6.js";import"./index-NBviKt90.js";import"./dropdown-menu-BjTqZSk3.js";import"./app-logo-icon-OJP8soNu.js";import"./briefcase-Ds8aUonx.js";import"./file-text-B_uuA7fw.js";import"./users-D5HMEUSS.js";import"./chevron-right-CJuhAO9Z.js";import"./calendar-Bn8_pEYd.js";import"./chevron-left-BCH51lPg.js";function Z(){const{project:i}=C().props,{data:r,setData:l,patch:j,processing:d,errors:s,reset:x}=D({title:i.title,short_description:i.short_description,description:i.description,date:i.date,period:i.period,duration:i.duration,team_size:i.team_size,type:i.type,technologies:i.technologies,category:i.category,challenge:i.challenge,solution:i.solution,results:i.results,client:i.client,demo_url:i.demo_url,github_url:i.github_url,image:null,gallery:i.gallery,features:i.features,process:i.process}),[m,v]=h.useState(null),[n,y]=h.useState(),b=t=>{t.preventDefault();const _=m?p(m,"yyyy-MM-dd"):r.date,N=n&&n.from&&n.to?`${p(n.from,"MMM yyyy")} - ${p(n.to,"MMM yyyy")}`:r.period;l({...r,date:_,period:N}),j(route("projects.update",i.id),{preserveState:!0,onSuccess:()=>x()})},f=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Projects",href:"/admin/projects"},{title:"Edit Project",href:`/admin/projects/${i.id}/edit`}];return e.jsxs(M,{breadcrumbs:f,children:[e.jsx(P,{title:"Edit Project"}),e.jsxs("div",{className:"px-4 py-8 md:px-6 md:py-10",children:[e.jsx("h1",{className:"text-3xl font-bold mb-6",children:"Edit Project"}),e.jsxs("form",{className:"grid grid-cols-1 gap-6",onSubmit:b,encType:"multipart/form-data",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"title",children:"Title"}),e.jsx(c,{id:"title",type:"text",value:r.title,onChange:t=>l("title",t.target.value),placeholder:"Project Title",disabled:d}),s.title&&e.jsx(a,{message:s.title})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"short_description",children:"Short Description"}),e.jsx(c,{id:"short_description",type:"text",value:r.short_description,onChange:t=>l("short_description",t.target.value),placeholder:"A brief summary",disabled:d}),s.short_description&&e.jsx(a,{message:s.short_description})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{children:"Date"}),e.jsx(z,{value:m,onChange:v}),s.date&&e.jsx(a,{message:s.date})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-2",children:[e.jsx(o,{htmlFor:"description",children:"Description"}),e.jsx(g,{id:"description",value:r.description,onChange:t=>l("description",t.target.value),placeholder:"Detailed project description",disabled:d}),s.description&&e.jsx(a,{message:s.description})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{children:"Period"}),e.jsx(E,{onSelect:y,className:"w-full"}),s.period&&e.jsx(a,{message:s.period})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"duration",children:"Duration"}),e.jsx(c,{id:"duration",type:"text",value:r.duration,onChange:t=>l("duration",t.target.value),placeholder:"e.g., 3 months",disabled:d}),s.duration&&e.jsx(a,{message:s.duration})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"team_size",children:"Team Size"}),e.jsx(c,{id:"team_size",type:"number",value:r.team_size,onChange:t=>l("team_size",t.target.value),placeholder:"e.g., 3",disabled:d}),s.team_size&&e.jsx(a,{message:s.team_size})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"type",children:"Type"}),e.jsx(c,{id:"type",type:"text",value:r.type,onChange:t=>l("type",t.target.value),placeholder:"e.g., Web Application",disabled:d}),s.type&&e.jsx(a,{message:s.type})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"client",children:"Client"}),e.jsx(c,{id:"client",type:"text",value:r.client,onChange:t=>l("client",t.target.value),placeholder:"Client Name",disabled:d}),s.client&&e.jsx(a,{message:s.client})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(u,{label:"Technologies",values:r.technologies,onChange:t=>l("technologies",t),placeholder:"Enter a technology"}),s.technologies&&e.jsx(a,{message:s.technologies})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(u,{label:"Category",values:r.category,onChange:t=>l("category",t),placeholder:"Enter a category"}),s.category&&e.jsx(a,{message:s.category})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-2",children:[e.jsx(o,{htmlFor:"image",children:"Main Image"}),e.jsx(c,{id:"image",type:"file",onChange:t=>l("image",t.target.files?t.target.files[0]:null),accept:"image/*",disabled:d}),s.image&&e.jsx(a,{message:s.image})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"demo_url",children:"Demo URL"}),e.jsx(c,{id:"demo_url",type:"text",value:r.demo_url,onChange:t=>l("demo_url",t.target.value),placeholder:"https://",disabled:d}),s.demo_url&&e.jsx(a,{message:s.demo_url})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"github_url",children:"GitHub URL"}),e.jsx(c,{id:"github_url",type:"text",value:r.github_url,onChange:t=>l("github_url",t.target.value),placeholder:"https://",disabled:d}),s.github_url&&e.jsx(a,{message:s.github_url})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"challenge",children:"Challenge"}),e.jsx(g,{id:"challenge",value:r.challenge,onChange:t=>l("challenge",t.target.value),placeholder:"Project challenge...",disabled:d}),s.challenge&&e.jsx(a,{message:s.challenge})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"solution",children:"Solution"}),e.jsx(g,{id:"solution",value:r.solution,onChange:t=>l("solution",t.target.value),placeholder:"Project solution...",disabled:d}),s.solution&&e.jsx(a,{message:s.solution})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsx(o,{htmlFor:"results",children:"Results"}),e.jsx(g,{id:"results",value:r.results,onChange:t=>l("results",t.target.value),placeholder:"Project results...",disabled:d}),s.results&&e.jsx(a,{message:s.results})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(F,{type:"submit",className:"mt-4 px-4",disabled:d,children:[d&&e.jsx(L,{className:"h-4 w-4 animate-spin mr-2"}),"Update Project"]})})]})]})]})}export{Z as default};
