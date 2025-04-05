import{K as d,j as s,L as c,$ as t}from"./app-CvFJx_F7.js";import{A as n}from"./app-layout-CrZNnGY6.js";import{B as i}from"./button-DVSv5keM.js";import"./index-NBviKt90.js";import"./dropdown-menu-BjTqZSk3.js";import"./index-DMqwLZB6.js";import"./app-logo-icon-OJP8soNu.js";import"./briefcase-Ds8aUonx.js";import"./file-text-B_uuA7fw.js";import"./users-D5HMEUSS.js";import"./chevron-right-CJuhAO9Z.js";function v(){const{education:e}=d().props,o=[{title:"Dashboard",href:"/dashboard"},{title:"Educations",href:"/educations"},{title:e.degree,href:`/educations/${e.id}`}];return s.jsxs(n,{breadcrumbs:o,children:[s.jsx(c,{title:`Education - ${e.degree}`}),s.jsxs("div",{className:"max-w-3xl mx-auto p-6 space-y-6",children:[s.jsx("h1",{className:"text-3xl font-bold",children:e.degree}),s.jsx("p",{className:"text-xl",children:e.institution}),e.period&&s.jsx("p",{className:"text-sm text-muted-foreground",children:e.period}),e.location&&s.jsx("p",{className:"text-sm",children:e.location}),e.logo&&s.jsx("img",{src:`/storage/${e.logo}`,alt:e.institution,className:"my-4 w-32 h-32 object-contain"}),e.description&&s.jsx("p",{children:e.description}),e.courses&&e.courses.length>0&&s.jsxs("div",{className:"mt-4",children:[s.jsx("h2",{className:"text-xl font-semibold",children:"Courses"}),s.jsx("ul",{className:"list-disc ml-6",children:e.courses.map((r,a)=>s.jsx("li",{children:r},a))})]}),s.jsxs("div",{className:"flex gap-4 mt-6",children:[s.jsx(t,{href:route("admin.educations.edit",e.id),children:s.jsx(i,{variant:"outline",children:"Edit"})}),s.jsx(t,{href:route("admin.educations.index"),children:s.jsx(i,{variant:"default",children:"Back to List"})})]})]})]})}export{v as default};
