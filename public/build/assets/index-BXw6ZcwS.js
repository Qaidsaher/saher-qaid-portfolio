import{K as o,j as s,L as d,$ as e}from"./app-CvFJx_F7.js";import{A as n}from"./app-layout-CrZNnGY6.js";import{C as c}from"./card-D-bNyKoR.js";import{B as i}from"./button-DVSv5keM.js";import"./index-NBviKt90.js";import"./dropdown-menu-BjTqZSk3.js";import"./index-DMqwLZB6.js";import"./app-logo-icon-OJP8soNu.js";import"./briefcase-Ds8aUonx.js";import"./file-text-B_uuA7fw.js";import"./users-D5HMEUSS.js";import"./chevron-right-CJuhAO9Z.js";function v(){const{educations:r}=o().props,a=[{title:"Dashboard",href:"/dashboard"},{title:"Educations",href:"/educations"}];return s.jsxs(n,{breadcrumbs:a,children:[s.jsx(d,{title:"Educations"}),s.jsxs("div",{className:"p-8 space-y-8",children:[s.jsxs("div",{className:"flex justify-between items-center mb-6",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Educations"}),s.jsx(e,{href:route("admin.educations.create"),children:s.jsx(i,{children:"Create New Education"})})]}),s.jsx("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:r.map(t=>s.jsxs(c,{className:"p-4",children:[s.jsx("h2",{className:"text-xl font-bold",children:t.degree}),s.jsx("p",{className:"text-sm text-muted-foreground",children:t.institution}),t.period&&s.jsx("p",{className:"text-sm",children:t.period}),t.location&&s.jsx("p",{className:"text-sm",children:t.location}),s.jsxs("div",{className:"mt-4 flex justify-end gap-2",children:[s.jsx(e,{href:route("admin.educations.edit",t.id),children:s.jsx(i,{variant:"outline",children:"Edit"})}),s.jsx(e,{href:route("admin.educations.show",t.id),children:s.jsx(i,{variant:"default",children:"View"})})]})]},t.id))})]})]})}export{v as default};
