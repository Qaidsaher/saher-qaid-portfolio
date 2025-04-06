import{K as f,m as p,r as m,j as e,L as u,$ as t}from"./app-7e523FSC.js";import{A as j}from"./app-layout-D710PciM.js";import{B as i}from"./button-DX1lcxT-.js";import{C as N}from"./confirm-model-D6yOCYwt.js";import{P as v}from"./plus-Co1J-lfO.js";import{E as y}from"./eye-BDf4nOwD.js";import{S as g}from"./square-pen-DNytZ_vp.js";import{T as b}from"./trash-B44VE3J0.js";import"./index-BFLhZdtq.js";import"./dropdown-menu-CumGd39Q.js";import"./index-BoVT7aLE.js";import"./app-logo-icon-7kSI5bS-.js";import"./briefcase-BLY5dM4Q.js";import"./file-text-1jXWwqAk.js";import"./users-PCIl3h8a.js";import"./chevron-right-CcSUNiO3.js";const C=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Articles",href:"/admin/articles"}];function F(){const{articles:l}=f().props,o=p({}),[n,r]=m.useState(null),[d,a]=m.useState(!1),c=s=>{r(s),a(!0)},x=()=>{n&&o.delete(route("admin.articles.destroy",n),{preserveState:!0}),a(!1),r(null)},h=()=>{a(!1),r(null)};return e.jsxs(j,{breadcrumbs:C,children:[e.jsx(u,{title:"Manage Articles"}),e.jsxs("div",{className:"px-8 py-8",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:"Manage Articles"}),e.jsx(i,{asChild:!0,className:"flex items-center",children:e.jsxs(t,{href:route("admin.articles.create"),children:[e.jsx(v,{className:"mr-2",size:20}),"Create Article"]})})]}),e.jsx(N,{open:d,title:"Confirm Deletion",message:"Are you sure you want to delete this article? This action cannot be undone.",onConfirm:x,onCancel:h}),e.jsx("div",{className:" shadow rounded-lg",children:l.length>0?e.jsx("div",{className:"divide-y divide-gray-200",children:l.map(s=>e.jsxs("div",{className:"p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-xl font-semibold",children:e.jsx(t,{href:route("admin.articles.show",s.id),className:"hover:underline",children:s.title})}),e.jsx("p",{className:"mt-1 text-gray-600",children:s.excerpt}),e.jsxs("p",{className:"mt-2 text-sm text-gray-500",children:["Published on: ",s.publish_date]})]}),e.jsxs("div",{className:"mt-4 sm:mt-0 flex gap-2",children:[e.jsx(i,{asChild:!0,variant:"ghost",title:"View Article",children:e.jsxs(t,{href:route("admin.articles.show",s.id),children:[e.jsx(y,{size:20,className:"mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"View"})]})}),e.jsx(i,{asChild:!0,variant:"outline",title:"Edit Article",children:e.jsxs(t,{href:route("admin.articles.edit",s.id),children:[e.jsx(g,{size:20,className:"mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Edit"})]})}),e.jsxs(i,{variant:"ghost",onClick:()=>c(s.id),className:"flex items-center",children:[e.jsx(b,{size:20,className:"mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Delete"})]})]})]},s.id))}):e.jsx("div",{className:"p-4 text-center text-gray-500",children:"No articles found."})})]})]})}export{F as default};
