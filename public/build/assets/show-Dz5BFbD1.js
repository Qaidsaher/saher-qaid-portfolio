import{j as e,L as t}from"./app-7e523FSC.js";import{A as a}from"./app-layout-D710PciM.js";import"./button-DX1lcxT-.js";import"./index-BFLhZdtq.js";import"./dropdown-menu-CumGd39Q.js";import"./index-BoVT7aLE.js";import"./app-logo-icon-7kSI5bS-.js";import"./briefcase-BLY5dM4Q.js";import"./file-text-1jXWwqAk.js";import"./users-PCIl3h8a.js";import"./chevron-right-CcSUNiO3.js";function j({certification:r}){const s=[{title:"Dashboard",href:"/admin/dashboard"},{title:"Certifications",href:"/admin/certifications"},{title:"Certification Details",href:`/admin/certifications/${r.id}`}];return e.jsxs(a,{breadcrumbs:s,children:[e.jsx(t,{title:"Certification Details"}),e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("div",{className:"mb-6",children:e.jsx("a",{href:route("admin.certifications.index"),className:"text-blue-600 hover:underline",children:"← Back to Certifications"})}),e.jsxs("div",{className:"bg-white shadow rounded p-6",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:r.name}),e.jsxs("p",{className:"mb-2 text-gray-700",children:[e.jsx("strong",{children:"Issuer:"})," ",r.issuer]}),r.date&&e.jsxs("p",{className:"mb-2 text-gray-700",children:[e.jsx("strong",{children:"Date:"})," ",r.date]}),r.url&&e.jsxs("p",{className:"mb-2 text-gray-700",children:[e.jsx("strong",{children:"URL:"})," ",e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:r.url})]})]})]})]})}export{j as default};
