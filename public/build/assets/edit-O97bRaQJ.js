import{K as O,r as x,m as N,j as e,L as B}from"./app-7e523FSC.js";import{A as J}from"./app-layout-D710PciM.js";import{B as j}from"./button-DX1lcxT-.js";import{I as i}from"./input-CXNGTfDd.js";import{L as l}from"./label-D4Pgj521.js";import{T as M}from"./textarea-DklnfoE6.js";import{I as o}from"./input-error-0gzVpjgp.js";import{P as G}from"./pen-CoYFywvz.js";import{L}from"./loader-circle-D8nY4uRg.js";import{X as q}from"./dropdown-menu-CumGd39Q.js";import"./index-BFLhZdtq.js";import"./index-BoVT7aLE.js";import"./app-logo-icon-7kSI5bS-.js";import"./briefcase-BLY5dM4Q.js";import"./file-text-1jXWwqAk.js";import"./users-PCIl3h8a.js";import"./chevron-right-CcSUNiO3.js";const P=t=>{const h={};return t.forEach(d=>{d.name&&d.url&&(h[d.name]=d.url)}),h};function de(){const{website:t}=O().props,h=x.useRef(null),[d,k]=x.useState(t.heroImageSrc),{data:u,setData:w,post:C,processing:v,errors:b}=N({id:t.id,heroImageSrc:null}),F=()=>{var a;(a=h.current)==null||a.click()},I=a=>{if(a.target.files&&a.target.files[0]){const n=a.target.files[0];w("heroImageSrc",n),k(URL.createObjectURL(n))}},D=a=>{a.preventDefault();const n=new FormData;u.heroImageSrc&&n.append("heroImageSrc",u.heroImageSrc),C(route("admin.website.updateImage"),{preserveScroll:!0,preserveState:!0,forceFormData:!0})},_=Object.entries(t.socialLinks||{}).map(([a,n])=>({name:a,url:n})),[m,f]=x.useState(_),[p,y]=x.useState(""),[g,T]=x.useState(""),{data:c,setData:s,put:A,processing:S,errors:r}=N({id:t.id,websiteName:t.websiteName,badge:t.badge,heroTitle:t.heroTitle,heroDescription:t.heroDescription,ctaPrimaryText:t.ctaPrimaryText,ctaPrimaryLink:t.ctaPrimaryLink,ctaSecondaryText:t.ctaSecondaryText,ctaSecondaryLink:t.ctaSecondaryLink,availableForProjectsText:t.availableForProjectsText,experienceText:t.experienceText,socialLinks:JSON.stringify(P(m)),status:t.status,responseTime:t.responseTime,preferredProjects:t.preferredProjects,email:t.email,phone:t.phone,location:t.location,number_of_experiences:t.number_of_experiences});x.useEffect(()=>{const a=JSON.stringify(P(m));s("socialLinks",a)},[m,s]);const E=()=>{p.trim()&&g.trim()&&(f([...m,{name:p.trim(),url:g.trim()}]),y(""),T(""))},W=a=>{const n=m.filter((z,R)=>R!==a);f(n)},U=a=>{a.preventDefault(),A(route("admin.website.update"),{preserveState:!0})},H=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Website",href:"/admin/website"},{title:"Edit Website",href:"/admin/website/edit"}];return e.jsxs(J,{breadcrumbs:H,children:[e.jsx(B,{title:"Edit Website Settings"}),e.jsxs("div",{className:"w-full p-8 space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Update Hero Image"}),e.jsxs("form",{onSubmit:D,encType:"multipart/form-data",children:[e.jsxs("div",{className:"relative w-full h-64 rounded-lg overflow-hidden border shadow-sm",children:[d?e.jsx("img",{src:d.startsWith("blob:")?d:`/storage/${d}`,alt:"Hero Preview",className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-gray-400 text-sm",children:"No image available"}),e.jsx("button",{type:"button",onClick:F,className:"absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 z-10",title:"Change Hero Image",children:e.jsx(G,{className:"w-5 h-5 text-gray-800"})}),e.jsx("input",{ref:h,type:"file",className:"hidden",accept:"image/*",onChange:I})]}),b.heroImageSrc&&e.jsx(o,{message:b.heroImageSrc}),e.jsx("div",{className:"flex justify-end mt-4",children:e.jsxs(j,{type:"submit",disabled:v,children:[v&&e.jsx(L,{className:"w-4 h-4 animate-spin mr-2"}),"Update Hero Image"]})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Update Website Settings"}),e.jsxs("form",{onSubmit:U,className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-2",children:[e.jsx(l,{htmlFor:"websiteName",children:"Website Name"}),e.jsx(i,{id:"websiteName",type:"text",value:c.websiteName,onChange:a=>s("websiteName",a.target.value),placeholder:"My Portfolio Website"}),r.websiteName&&e.jsx(o,{message:r.websiteName})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-2",children:[e.jsx(l,{htmlFor:"badge",children:"Badge"}),e.jsx(i,{id:"badge",type:"text",value:c.badge,onChange:a=>s("badge",a.target.value),placeholder:"Full-Stack Developer"}),r.badge&&e.jsx(o,{message:r.badge})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[e.jsx(l,{htmlFor:"heroTitle",children:"Hero Title"}),e.jsx(i,{id:"heroTitle",type:"text",value:c.heroTitle,onChange:a=>s("heroTitle",a.target.value),placeholder:"Crafting Smart, Scalable Web and AI Solutions"}),r.heroTitle&&e.jsx(o,{message:r.heroTitle})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[e.jsx(l,{htmlFor:"heroDescription",children:"Hero Description"}),e.jsx(M,{id:"heroDescription",value:c.heroDescription,onChange:a=>s("heroDescription",a.target.value),placeholder:"I build innovative web applications and AI-driven solutions..."}),r.heroDescription&&e.jsx(o,{message:r.heroDescription})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"ctaPrimaryText",children:"CTA Primary Text"}),e.jsx(i,{id:"ctaPrimaryText",type:"text",value:c.ctaPrimaryText,onChange:a=>s("ctaPrimaryText",a.target.value),placeholder:"View My Work"}),r.ctaPrimaryText&&e.jsx(o,{message:r.ctaPrimaryText})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"ctaPrimaryLink",children:"CTA Primary Link"}),e.jsx(i,{id:"ctaPrimaryLink",type:"text",value:c.ctaPrimaryLink,onChange:a=>s("ctaPrimaryLink",a.target.value),placeholder:"/projects"}),r.ctaPrimaryLink&&e.jsx(o,{message:r.ctaPrimaryLink})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"ctaSecondaryText",children:"CTA Secondary Text"}),e.jsx(i,{id:"ctaSecondaryText",type:"text",value:c.ctaSecondaryText,onChange:a=>s("ctaSecondaryText",a.target.value),placeholder:"Get in Touch"}),r.ctaSecondaryText&&e.jsx(o,{message:r.ctaSecondaryText})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"ctaSecondaryLink",children:"CTA Secondary Link"}),e.jsx(i,{id:"ctaSecondaryLink",type:"text",value:c.ctaSecondaryLink,onChange:a=>s("ctaSecondaryLink",a.target.value),placeholder:"/contact"}),r.ctaSecondaryLink&&e.jsx(o,{message:r.ctaSecondaryLink})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"availableForProjectsText",children:"Available for Projects Text"}),e.jsx(i,{id:"availableForProjectsText",type:"text",value:c.availableForProjectsText,onChange:a=>s("availableForProjectsText",a.target.value),placeholder:"Available for Projects"}),r.availableForProjectsText&&e.jsx(o,{message:r.availableForProjectsText})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"experienceText",children:"Experience Text"}),e.jsx(i,{id:"experienceText",type:"text",value:c.experienceText,onChange:a=>s("experienceText",a.target.value),placeholder:"3+ Years Experience"}),r.experienceText&&e.jsx(o,{message:r.experienceText})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(l,{children:"Social Links"}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(i,{type:"text",placeholder:"Social Name (e.g., GitHub)",value:p,onChange:a=>y(a.target.value)}),e.jsx(i,{type:"text",placeholder:"Social URL (e.g., https://github.com)",value:g,onChange:a=>T(a.target.value)}),e.jsx(j,{type:"button",onClick:E,children:"Add"})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:m.map((a,n)=>e.jsxs("div",{className:"inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm",children:[e.jsx("span",{children:a.name}),e.jsx("button",{type:"button",onClick:()=>W(n),className:"ml-1",children:e.jsx(q,{className:"w-4 h-4"})})]},n))})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"status",children:"Status"}),e.jsx(i,{id:"status",type:"text",value:c.status,onChange:a=>s("status",a.target.value),placeholder:"Open to Offers"}),r.status&&e.jsx(o,{message:r.status})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"responseTime",children:"Response Time"}),e.jsx(i,{id:"responseTime",type:"text",value:c.responseTime,onChange:a=>s("responseTime",a.target.value),placeholder:"Within 24 hours"}),r.responseTime&&e.jsx(o,{message:r.responseTime})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"preferredProjects",children:"Preferred Projects"}),e.jsx(i,{id:"preferredProjects",type:"text",value:c.preferredProjects,onChange:a=>s("preferredProjects",a.target.value),placeholder:"Web & Mobile Apps"}),r.preferredProjects&&e.jsx(o,{message:r.preferredProjects})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"email",children:"Email"}),e.jsx(i,{id:"email",type:"email",value:c.email,onChange:a=>s("email",a.target.value),placeholder:"saherqaid2020@gmail.com"}),r.email&&e.jsx(o,{message:r.email})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"phone",children:"Phone"}),e.jsx(i,{id:"phone",type:"text",value:c.phone,onChange:a=>s("phone",a.target.value),placeholder:"+1 (555) 123-4567"}),r.phone&&e.jsx(o,{message:r.phone})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"location",children:"Location"}),e.jsx(i,{id:"location",type:"text",value:c.location,onChange:a=>s("location",a.target.value),placeholder:"San Francisco, CA"}),r.location&&e.jsx(o,{message:r.location})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"number_of_experiences",children:"Number of Experiences"}),e.jsx(i,{id:"number_of_experiences",type:"number",value:c.number_of_experiences,onChange:a=>s("number_of_experiences",parseInt(a.target.value)),placeholder:"3"}),r.number_of_experiences&&e.jsx(o,{message:r.number_of_experiences})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(j,{type:"submit",disabled:S,children:[S&&e.jsx(L,{className:"w-4 h-4 animate-spin mr-2"}),"Update Website Settings"]})})]})]})]})]})}export{de as default};
