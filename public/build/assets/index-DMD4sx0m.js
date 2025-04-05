import{K as b,r as t,j as e,L as C}from"./app-CvFJx_F7.js";import{U as S}from"./user-layout-DEhTxv9b.js";import{C as d,a as o,b as x,c as h,d as j}from"./card-D-bNyKoR.js";import{I as p}from"./input-DRu8dsmV.js";import{T as I}from"./textarea-D9d5Xnif.js";import{c as P,B as F}from"./button-DVSv5keM.js";import{L as l}from"./label-BOGrb1H7.js";import{M as L}from"./mail-CrrZZPgC.js";import{P as M,M as T}from"./phone-DJ-6V3ce.js";import{L as q}from"./loader-circle-ePsAsDID.js";import"./dropdown-menu-BjTqZSk3.js";import"./index-NBviKt90.js";import"./index-DMqwLZB6.js";import"./sun-BszNkBvR.js";import"./github-D1PJX23O.js";import"./twitter-Bb_P9RXj.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],E=P("Send",w),k=()=>{const{website:s}=b().props,[u,f]=t.useState(!1),[a,g]=t.useState({name:"",email:"",subject:"",message:""}),[i,A]=t.useState({email:(s==null?void 0:s.email)??"saherqaid2020@gmail.com",phone:(s==null?void 0:s.phone)??"+967 712238264",location:(s==null?void 0:s.location)??"Yemen Ibb city"}),[n,D]=t.useState({status:(s==null?void 0:s.status)??"Open to Offers",responseTime:(s==null?void 0:s.responseTime)??"Within 24 hours",preferredProjects:(s==null?void 0:s.preferredProjects)??"Web & Mobile Apps"}),r=m=>{const{name:c,value:v}=m.target;g(y=>({...y,[c]:v}))},N=async m=>{m.preventDefault(),f(!0),await new Promise(c=>setTimeout(c,1500)),g({name:"",email:"",subject:"",message:""}),alert(JSON.stringify(a)),f(!1)};return t.useEffect(()=>{},[]),e.jsxs(e.Fragment,{children:[e.jsx(C,{title:"Contact"}),e.jsxs("div",{className:"max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16",children:[e.jsxs("div",{className:"flex flex-col items-center text-center mb-12",children:[e.jsx("h1",{className:"text-4xl font-bold tracking-tight md:text-5xl mb-4",children:"Get in Touch"}),e.jsx("p",{className:"text-muted-foreground max-w-2xl",children:"Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you."})]}),e.jsxs("div",{className:"grid gap-8 md:grid-cols-3 lg:gap-12",children:[e.jsxs("div",{className:"md:col-span-1 space-y-6",children:[e.jsxs(d,{className:"glass-card",children:[e.jsxs(o,{children:[e.jsx(x,{children:"Contact Information"}),e.jsx(h,{children:"Feel free to reach out through any of these channels"})]}),e.jsxs(j,{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(L,{className:"h-5 w-5 text-muted-foreground mt-0.5"}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-medium",children:"Email"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:i.email})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(M,{className:"h-5 w-5 text-muted-foreground mt-0.5"}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-medium",children:"Phone"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:i.phone})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(T,{className:"h-5 w-5 text-muted-foreground mt-0.5"}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-medium",children:"Location"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:i.location})]})]})]})]}),e.jsxs(d,{className:"glass-card",children:[e.jsxs(o,{children:[e.jsx(x,{children:"Availability"}),e.jsx(h,{children:"Current status and response time"})]}),e.jsx(j,{children:e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Project Availability"}),e.jsx("span",{className:"text-sm font-medium",children:n.status})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Response Time"}),e.jsx("span",{className:"text-sm font-medium",children:n.responseTime})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm",children:"Preferred Projects"}),e.jsx("span",{className:"text-sm font-medium",children:n.preferredProjects})]})]})})]})]}),e.jsx("div",{className:"md:col-span-2",children:e.jsxs(d,{className:"glass-card",children:[e.jsxs(o,{children:[e.jsx(x,{children:"Send a Message"}),e.jsx(h,{children:"Fill out the form below and I'll get back to you as soon as possible"})]}),e.jsx(j,{children:e.jsxs("form",{onSubmit:N,className:"space-y-6",children:[e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"name",children:"Name"}),e.jsx(p,{id:"name",name:"name",placeholder:"Your name",value:a.name,onChange:r,required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"email",children:"Email"}),e.jsx(p,{id:"email",name:"email",type:"email",placeholder:"Your email",value:a.email,onChange:r,required:!0})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"subject",children:"Subject"}),e.jsx(p,{id:"subject",name:"subject",placeholder:"What is this regarding?",value:a.subject,onChange:r,required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(l,{htmlFor:"message",children:"Message"}),e.jsx(I,{id:"message",name:"message",placeholder:"Your message",rows:6,value:a.message,onChange:r,required:!0})]}),e.jsx(F,{type:"submit",className:"w-full",disabled:u,children:u?e.jsxs(e.Fragment,{children:[e.jsx(q,{className:"mr-2 h-4 w-4 animate-spin"}),"Sending..."]}):e.jsxs(e.Fragment,{children:[e.jsx(E,{className:"mr-2 h-4 w-4"}),"Send Message"]})})]})})]})})]})]})]})};k.layout=s=>e.jsx(S,{children:s});export{k as default};
