import{r as d,j as e}from"./app-7e523FSC.js";import{B as m}from"./button-DX1lcxT-.js";import{I as x}from"./input-CXNGTfDd.js";import{L as f}from"./label-D4Pgj521.js";function y({label:l,values:s,onChange:a,placeholder:c}){const[r,o]=d.useState(""),i=()=>{r.trim()!==""&&(a([...s,r.trim()]),o(""))},p=t=>{const n=[...s];n.splice(t,1),a(n)},u=t=>{t.key==="Enter"&&(t.preventDefault(),i())};return e.jsxs("div",{className:"grid gap-1",children:[e.jsx(f,{children:l}),e.jsx("div",{className:"flex flex-wrap gap-2",children:s.map((t,n)=>e.jsxs("div",{className:"inline-flex items-center gap-1 border px-2 py-0.5 rounded-md bg-blue-100 text-blue-800",children:[e.jsx("span",{children:t}),e.jsx("button",{type:"button",onClick:()=>p(n),className:"text-red-500 focus:outline-none",children:"x"})]},n))}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(x,{type:"text",value:r,onChange:t=>o(t.target.value),onKeyDown:u,placeholder:c}),e.jsx(m,{type:"button",onClick:i,children:"Add"})]})]})}export{y as M};
