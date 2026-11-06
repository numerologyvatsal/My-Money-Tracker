const STORAGE_KEY='my-money-data-v1';
const LANG_KEY='my-money-lang-v1';
const BALANCE_VIEW_KEY='my-money-balance-view-v1';
const SUMMARY_VIEW_KEYS={
  balance:BALANCE_VIEW_KEY,income:'my-money-income-view-v1',expense:'my-money-expense-view-v1',today:'my-money-today-view-v1'
};
const defaultData={
  accounts:[{
    id:'cash-main',name:'Cash',type:'cash',opening:0,createdAt:Date.now()
  }],transactions:[]
};
const CATEGORY_STORAGE_KEY='my-money-categories-v1';
const defaultCategories={
  expense:['Food','Travel','Shopping','Bills','Health','Family','Business','Other'],income:['Salary','Business','Interest','Gift','Refund','Other']
};
function loadCategories(){
  try{
    const saved=JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY));
    if(saved&&Array.isArray(saved.income)&&Array.isArray(saved.expense)){
      return {income:[...new Set(saved.income.filter(x=>typeof x==='string'&&x.trim()).map(x=>x.trim()))],expense:[...new Set(saved.expense.filter(x=>typeof x==='string'&&x.trim()).map(x=>x.trim()))]}
    }
  }catch{}
  return structuredClone(defaultCategories)
}
let categories=loadCategories();
function saveCategories(){localStorage.setItem(CATEGORY_STORAGE_KEY,JSON.stringify(categories))}
const guCategories={
  Food:'ખાવા-પીવાનું',Travel:'મુસાફરી',Shopping:'ખરીદી',Bills:'બિલ',Health:'આરોગ્ય',Family:'પરિવાર',Business:'બિઝનેસ',Other:'અન્ય',Salary:'પગાર',Interest:'વ્યાજ',Gift:'ભેટ',Refund:'રિફંડ'
};
const i18n={
  en:{
    brand:'My Money',brandSub:'Daily Finance',dashboard:'Dashboard',transactions:'Transactions',accounts:'Accounts',backup:'Backup & Data',backupShort:'Backup',deviceOnly:'Saved only on this device',installApp:'Install App',totalBalance:'Total Balance',cashAndBanks:'Cash + all bank accounts',totalIncome:'Total Income',totalExpense:'Total Expense',allTime:'All time',todayExpense:"Today's Expense",quickEntry:'Quick Entry',addTransaction:'Add Transaction',expense:'Expense',income:'Income',transfer:'Transfer',date:'Date',amount:'Amount',account:'Account',toAccount:'To Account',category:'Category',noteOptional:'Note (optional)',notePlaceholder:'What was this for?',saveTransaction:'Save Transaction',moneyLocation:'Money Location',accountBalances:'Account Balances',manage:'Manage',latestActivity:'Latest Activity',recentTransactions:'Recent Transactions',viewAll:'View all',completeRecord:'Complete Record',transactionHistory:'Transaction History',allTypes:'All types',allAccounts:'All Accounts',filterByAccount:'Select account',clear:'Clear',cashAndBank:'Cash & Bank',yourAccounts:'Your Accounts',newAccount:'New Account',addBankOrCash:'Add Bank or Cash',accountName:'Account Name',accountExample:'e.g. HDFC Bank',accountType:'Account Type',bankAccount:'Bank Account',cashWallet:'Cash / Wallet',openingBalance:'Opening Balance',addAccount:'Add Account',exportBackup:'Export Backup',exportHelp:'Download a copy of all your accounts and transactions.',downloadBackup:'Download Backup',restoreBackup:'Restore Backup',restoreHelp:'Restore data from a backup file created by this app.',chooseBackup:'Choose Backup File',resetAll:'Reset All Data',resetHelp:'Permanently remove every account and transaction from this device.',autosaveOn:'Autosave is on.',autosaveHelp:'Your data stays after refresh or reopening the browser. Keep a backup before clearing site data or changing your phone.',add:'Add',cancel:'Cancel',confirm:'Confirm',cash:'Cash',bank:'Bank account',noTransactions:'No transactions yet',noTransactionsHelp:'Add your first income or expense above.',noMatch:'No matching transactions',todayCount:'{n} transaction(s) today',saved:'Transaction saved',accountAdded:'Account added',deleted:'Transaction deleted',accountDeleted:'Account removed',cannotDelete:'This account has transactions. Delete or move them first.',needTwo:'Add another account before making a transfer.',sameAccount:'From and To accounts must be different.',backupDownloaded:'Backup downloaded',backupRestored:'Backup restored successfully',invalidBackup:'This backup file is not valid.',resetTitle:'Reset all data?',resetMessage:'This permanently deletes every account and transaction saved on this device.',resetDone:'All data has been reset',deleteTxTitle:'Delete this transaction?',deleteTxMessage:'The account balance will update immediately.',deleteAccountTitle:'Remove this account?',deleteAccountMessage:'Its opening balance will also be removed.',filteredIncome:'Income',filteredExpense:'Expense',entries:'entries',currentBalance:'Current balance',opening:'Opening',from:'From',to:'To',uncategorized:'Uncategorized'
  }, gu:{
    brand:'મારું હિસાબ',brandSub:'દૈનિક નાણાકીય હિસાબ',dashboard:'ડેશબોર્ડ',transactions:'લેવડદેવડ',accounts:'ખાતા',backup:'બેકઅપ અને ડેટા',backupShort:'બેકઅપ',deviceOnly:'ફક્ત આ ડિવાઇસમાં સેવ થાય છે',installApp:'એપ ઇન્સ્ટોલ કરો',totalBalance:'કુલ બેલેન્સ',cashAndBanks:'રોકડ + બધા બેંક ખાતા',totalIncome:'કુલ આવક',totalExpense:'કુલ ખર્ચ',allTime:'શરૂઆતથી અત્યાર સુધી',todayExpense:'આજનો ખર્ચ',quickEntry:'ઝડપી એન્ટ્રી',addTransaction:'નવી લેવડદેવડ ઉમેરો',expense:'ખર્ચ',income:'આવક',transfer:'ટ્રાન્સફર',date:'તારીખ',amount:'રકમ',account:'ખાતું',toAccount:'જે ખાતામાં મોકલવું',category:'કેટેગરી',noteOptional:'નોંધ (વૈકલ્પિક)',notePlaceholder:'આ રકમ શેના માટે હતી?',saveTransaction:'લેવડદેવડ સેવ કરો',moneyLocation:'પૈસા ક્યાં છે',accountBalances:'ખાતાનું બેલેન્સ',manage:'મેનેજ કરો',latestActivity:'તાજેતરની હિલચાલ',recentTransactions:'તાજેતરની લેવડદેવડ',viewAll:'બધી જુઓ',completeRecord:'સંપૂર્ણ રેકોર્ડ',transactionHistory:'લેવડદેવડનો ઇતિહાસ',allTypes:'બધા પ્રકાર',allAccounts:'બધા ખાતા',filterByAccount:'ખાતું પસંદ કરો',clear:'ફિલ્ટર સાફ કરો',cashAndBank:'રોકડ અને બેંક',yourAccounts:'તમારા ખાતા',newAccount:'નવું ખાતું',addBankOrCash:'બેંક અથવા રોકડ ખાતું ઉમેરો',accountName:'ખાતાનું નામ',accountExample:'દા.ત. HDFC Bank',accountType:'ખાતાનો પ્રકાર',bankAccount:'બેંક ખાતું',cashWallet:'રોકડ / વોલેટ',openingBalance:'શરૂઆતનું બેલેન્સ',addAccount:'ખાતું ઉમેરો',exportBackup:'બેકઅપ ડાઉનલોડ કરો',exportHelp:'તમારા બધા ખાતા અને લેવડદેવડની નકલ ડાઉનલોડ કરો.',downloadBackup:'બેકઅપ ડાઉનલોડ',restoreBackup:'બેકઅપ પાછું લાવો',restoreHelp:'આ એપથી બનાવેલી બેકઅપ ફાઇલમાંથી ડેટા પાછો લાવો.',chooseBackup:'બેકઅપ ફાઇલ પસંદ કરો',resetAll:'બધો ડેટા રીસેટ કરો',resetHelp:'આ ડિવાઇસમાંથી બધા ખાતા અને લેવડદેવડ કાયમ માટે દૂર કરો.',autosaveOn:'ઓટોસેવ ચાલુ છે.',autosaveHelp:'રિફ્રેશ કે બ્રાઉઝર ફરી ખોલ્યા પછી પણ ડેટા રહેશે. Site data સાફ કરવા અથવા ફોન બદલતા પહેલાં બેકઅપ રાખજો.',add:'ઉમેરો',cancel:'રદ કરો',confirm:'ખાતરી કરો',cash:'રોકડ',bank:'બેંક ખાતું',noTransactions:'હજી કોઈ લેવડદેવડ નથી',noTransactionsHelp:'ઉપરથી પહેલી આવક અથવા ખર્ચ ઉમેરો.',noMatch:'ફિલ્ટર મુજબ કોઈ લેવડદેવડ નથી',todayCount:'આજે {n} લેવડદેવડ',saved:'લેવડદેવડ સેવ થઈ ગઈ',accountAdded:'ખાતું ઉમેરાઈ ગયું',deleted:'લેવડદેવડ ડિલીટ થઈ',accountDeleted:'ખાતું દૂર થયું',cannotDelete:'આ ખાતામાં લેવડદેવડ છે. પહેલાં તેને ડિલીટ અથવા ટ્રાન્સફર કરો.',needTwo:'ટ્રાન્સફર માટે બીજું ખાતું ઉમેરો.',sameAccount:'From અને To ખાતું અલગ હોવું જોઈએ.',backupDownloaded:'બેકઅપ ડાઉનલોડ થઈ ગયું',backupRestored:'બેકઅપ સફળતાપૂર્વક પાછું આવ્યું',invalidBackup:'આ બેકઅપ ફાઇલ માન્ય નથી.',resetTitle:'બધો ડેટા રીસેટ કરવો છે?',resetMessage:'આ ડિવાઇસમાં સેવ થયેલા બધા ખાતા અને લેવડદેવડ કાયમ માટે ડિલીટ થશે.',resetDone:'બધો ડેટા રીસેટ થઈ ગયો',deleteTxTitle:'આ લેવડદેવડ ડિલીટ કરવી છે?',deleteTxMessage:'ખાતાનું બેલેન્સ તરત બદલાશે.',deleteAccountTitle:'આ ખાતું દૂર કરવું છે?',deleteAccountMessage:'તેનું શરૂઆતનું બેલેન્સ પણ દૂર થશે.',filteredIncome:'આવક',filteredExpense:'ખર્ચ',entries:'એન્ટ્રી',currentBalance:'હાલનું બેલેન્સ',opening:'શરૂઆત',from:'માંથી',to:'માં',uncategorized:'કેટેગરી વગર'
  }
};
Object.assign(i18n.en,{
  monthlyReport:'Monthly Report',monthlyStatement:'Monthly Statement PDF',selectMonth:'Select Month',selectReportAccount:'Account',downloadStatement:'Download PDF Statement',statementNote:'Includes opening balance, income, expenses, closing balance and all transactions for the selected month.',pdfDownloaded:'PDF statement downloaded',pdfError:'PDF could not be created. Please try again.'
});
Object.assign(i18n.gu,{
  monthlyReport:'માસિક રિપોર્ટ',monthlyStatement:'માસિક સ્ટેટમેન્ટ PDF',selectMonth:'મહિનો પસંદ કરો',selectReportAccount:'ખાતું',downloadStatement:'PDF સ્ટેટમેન્ટ ડાઉનલોડ કરો',statementNote:'પસંદ કરેલા મહિનાનું શરૂઆતનું બેલેન્સ, આવક, ખર્ચ, છેલ્લું બેલેન્સ અને બધી લેવડદેવડ સામેલ થશે.',pdfDownloaded:'PDF સ્ટેટમેન્ટ ડાઉનલોડ થઈ ગયું',pdfError:'PDF બનાવી શકાઈ નથી. ફરી પ્રયાસ કરો.'
});
Object.assign(i18n.en,{
  businessPerformance:'Business Performance',businessMonthlyProfitLoss:'Monthly Business Profit / Loss',selectYear:'Select Year',month:'Month',businessIncome:'Business Income',businessExpense:'Business Expense',netProfitLoss:'Net Profit / Loss',businessProfit:'Business Profit',businessLoss:'Business Loss',businessBreakEven:'No Profit / Loss',businessReportNote:'Calculated only from transactions whose category is Business. Transfers are not counted.',
  yearTotal:'Year Total'
});
Object.assign(i18n.gu,{
  businessPerformance:'બિઝનેસનું પરિણામ',businessMonthlyProfitLoss:'માસિક બિઝનેસ નફો / નુકસાન',selectYear:'વર્ષ પસંદ કરો',month:'મહિનો',businessIncome:'બિઝનેસ આવક',businessExpense:'બિઝનેસ ખર્ચ',netProfitLoss:'ચોખ્ખો નફો / નુકસાન',businessProfit:'બિઝનેસ નફો',businessLoss:'બિઝનેસ નુકસાન',businessBreakEven:'નફો / નુકસાન નથી',businessReportNote:'ફક્ત Business કેટેગરીની આવક અને ખર્ચ ગણાશે. ટ્રાન્સફર ગણાશે નહીં.',
  yearTotal:'વર્ષનો કુલ સરવાળો'
});
Object.assign(i18n.en,{
  manageCategories:'Manage Categories',openCategoryManager:'Manage Category · Add / Remove',closeCategoryManager:'Close Category Manager',openBusinessReport:'Monthly Business P/L · View Full Report',closeBusinessReport:'Hide Monthly Business P/L Report',filterSection:'Select / Filter',categoryType:'Category Type',categoryName:'Category Name',categoryNamePlaceholder:'e.g. Petrol, Medical, Freelance',addCategory:'Add Category',expenseCategories:'Expense Categories',incomeCategories:'Income Categories',deleteCategory:'Delete category',categoryAdded:'Category added',categoryExists:'This category already exists',categoryRequired:'Enter a category name',categoryDeleted:'Category deleted',businessProtected:'Business category is required for the Business Profit/Loss report and cannot be deleted.',categoryDeleteNote:'Deleting a category only removes it from future choices. Existing transactions keep their saved category.'
});
Object.assign(i18n.gu,{
  manageCategories:'કેટેગરી મેનેજ કરો',openCategoryManager:'કેટેગરી મેનેજ કરો · ઉમેરો / દૂર કરો',closeCategoryManager:'કેટેગરી મેનેજર બંધ કરો',openBusinessReport:'માસિક બિઝનેસ P/L · સંપૂર્ણ રિપોર્ટ જુઓ',closeBusinessReport:'માસિક બિઝનેસ P/L રિપોર્ટ બંધ કરો',filterSection:'પસંદગી / ફિલ્ટર',categoryType:'કેટેગરીનો પ્રકાર',categoryName:'કેટેગરીનું નામ',categoryNamePlaceholder:'દા.ત. પેટ્રોલ, મેડિકલ, ફ્રીલાન્સ',addCategory:'કેટેગરી ઉમેરો',expenseCategories:'ખર્ચની કેટેગરી',incomeCategories:'આવકની કેટેગરી',deleteCategory:'કેટેગરી ડિલીટ કરો',categoryAdded:'કેટેગરી ઉમેરાઈ ગઈ',categoryExists:'આ કેટેગરી પહેલેથી છે',categoryRequired:'કેટેગરીનું નામ લખો',categoryDeleted:'કેટેગરી ડિલીટ થઈ ગઈ',businessProtected:'Business નફા/નુકસાનના રિપોર્ટ માટે Business કેટેગરી જરૂરી છે, તેથી તેને ડિલીટ કરી શકાતી નથી.',categoryDeleteNote:'કેટેગરી ડિલીટ કરવાથી તે ફક્ત નવી એન્ટ્રીના વિકલ્પમાંથી દૂર થશે. જૂની લેવડદેવડમાં તેનું નામ રહેશે.'
});
let data=loadData();
let lang=localStorage.getItem(LANG_KEY)||'en';
let deferredInstall=null;
let pendingConfirm=null;
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const originalRenderAll=renderAll;
renderAll=function(){
  originalRenderAll();
  renderSummarySelectors();
  renderStatementAccounts()
};
function setupSummarySelect(kind,id){
  const select=$(id);
  if(!select)return null;
  const saved=localStorage.getItem(SUMMARY_VIEW_KEYS[kind])||'all';
  const selectedId=saved==='all'||data.accounts.some(a=>a.id===saved)?saved:'all';
  const allLabel=lang==='gu'?'બધા ખાતા':'All Accounts';
  select.innerHTML=`<option value="all">${allLabel}</option>`+data.accounts.map(a=>`<option value="${esc(a.id)}">${esc(a.name)} · ${t(a.type==='cash'?'cash':'bank')}</option>`).join('');
  select.value=selectedId;
  select.setAttribute('aria-label',lang==='gu'?'જે ખાતાનો હિસાબ જોવો હોય તે પસંદ કરો':'Choose an account to view');
  return data.accounts.find(a=>a.id===selectedId)||null
}
function summaryScope(account,fallback){
  return account?`${account.name} · ${t(account.type==='cash'?'cash':'bank')}`:fallback
}
function renderSummarySelectors(){
  const balanceAccount=setupSummarySelect('balance','#balanceAccountSelect');
  const incomeAccount=setupSummarySelect('income','#incomeAccountSelect');
  const expenseAccount=setupSummarySelect('expense','#expenseAccountSelect');
  const todayAccount=setupSummarySelect('today','#todayAccountSelect');
  const incomeTx=data.transactions.filter(x=>x.type==='income'&&(!incomeAccount||x.accountId===incomeAccount.id));
  const expenseTx=data.transactions.filter(x=>x.type==='expense'&&(!expenseAccount||x.accountId===expenseAccount.id));
  const today=localDate();
  const todayExpenseTx=data.transactions.filter(x=>x.type==='expense'&&x.date===today&&(!todayAccount||x.accountId===todayAccount.id));
  const todayRelevant=data.transactions.filter(x=>x.date===today&&(!todayAccount||x.accountId===todayAccount.id||x.toAccountId===todayAccount.id));
  $('#totalBalance').textContent=money(balanceAccount?accountBalance(balanceAccount.id):data.accounts.reduce((sum,a)=>sum+accountBalance(a.id),0));
  $('#totalIncome').textContent=money(incomeTx.reduce((sum,x)=>sum+x.amount,0));
  $('#totalExpense').textContent=money(expenseTx.reduce((sum,x)=>sum+x.amount,0));
  $('#todayExpense').textContent=money(todayExpenseTx.reduce((sum,x)=>sum+x.amount,0));
  $('#balanceScope').textContent=summaryScope(balanceAccount,t('cashAndBanks'));
  $('#incomeScope').textContent=summaryScope(incomeAccount,t('allTime'));
  $('#expenseScope').textContent=summaryScope(expenseAccount,t('allTime'));
  $('#todayTransactionCount').textContent=t('todayCount').replace('{n}',todayRelevant.length)
}
function renderStatementAccounts(){
  const select=$('#statementAccount');
  if(!select)return;
  const current=select.value||'all';
  const allLabel=lang==='gu'?'બધા ખાતા':'All Accounts';
  select.innerHTML=`<option value="all">${allLabel}</option>`+data.accounts.map(a=>`<option value="${esc(a.id)}">${esc(a.name)} · ${t(a.type==='cash'?'cash':'bank')}</option>`).join('');
  select.value=current==='all'||data.accounts.some(a=>a.id===current)?current:'all'
}
document.addEventListener('change',e=>{
  const kind=e.target.dataset.summaryKind;
  if(!kind)return;
  localStorage.setItem(SUMMARY_VIEW_KEYS[kind],e.target.value);
  renderSummarySelectors()
});

Object.assign(i18n.en,{allCategories:'All Categories',filterByCategory:'Select category'});
Object.assign(i18n.gu,{allCategories:'બધી કેટેગરી',filterByCategory:'કેટેગરી પસંદ કરો'});
function t(k){
  return i18n[lang][k]||i18n.en[k]||k
}
function safeData(raw){
  return raw&&Array.isArray(raw.accounts)&&Array.isArray(raw.transactions)&&raw.accounts.every(a=>a&&typeof a.id==='string'&&typeof a.name==='string')&&raw.transactions.every(x=>x&&typeof x.id==='string'&&['income','expense','transfer'].includes(x.type))
}
function loadData(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
    return safeData(parsed)?parsed:structuredClone(defaultData)
  }
  catch{
    return structuredClone(defaultData)
  }
}
function saveData(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
  renderAll()
}
function money(v){
  return new Intl.NumberFormat(lang==='gu'?'gu-IN':'en-IN',{
    style:'currency',currency:'INR',maximumFractionDigits:2
  }).format(Number(v)||0)
}
function localDate(){
  const d=new Date();
  d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
  return d.toISOString().slice(0,10)
}
function uid(p){
  return p+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7)
}
function esc(v=''){
  return String(v).replace(/[&<>'"]/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
  }
  [c]))
}
function accountBalance(id){
  const a=data.accounts.find(x=>x.id===id);
  if(!a)return 0;
  return data.transactions.reduce((sum,x)=>{
    if(x.type==='income'&&x.accountId===id)return sum+x.amount;
    if(x.type==='expense'&&x.accountId===id)return sum-x.amount;
    if(x.type==='transfer'&&x.accountId===id)return sum-x.amount;
    if(x.type==='transfer'&&x.toAccountId===id)return sum+x.amount;
    return sum
  },Number(a.opening)||0)
}
function totals(list=data.transactions){
  return list.reduce((r,x)=>{
    if(x.type==='income')r.income+=x.amount;
    if(x.type==='expense')r.expense+=x.amount;
    return r
  },{
    income:0,expense:0
  })
}
function setLanguage(next){
  lang=next;
  localStorage.setItem(LANG_KEY,lang);
  document.documentElement.lang=lang==='gu'?'gu':'en';
  $$('[data-i18n]').forEach(el=>{
    el.textContent=t(el.dataset.i18n)
  });
  $$('[data-i18n-placeholder]').forEach(el=>{
    el.placeholder=t(el.dataset.i18nPlaceholder)
  });
  $$('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  updateToday();
  renderAll()
}
function updateToday(){
  const date=new Intl.DateTimeFormat(lang==='gu'?'gu-IN':'en-IN',{
    weekday:'long',day:'numeric',month:'long',year:'numeric'
  }).format(new Date());
  $('#todayLabel').textContent=date
}
function accountOptions(selected=''){
  return data.accounts.map(a=>`<option value="${esc(a.id)}" ${a.id===selected?'selected':''}>${esc(a.name)} · ${money(accountBalance(a.id))}</option>`).join('')
}
function categoryOptions(type,selected=''){
  return (categories[type]||[]).map(c=>`<option value="${esc(c)}" ${c===selected?'selected':''}>${esc(lang==='gu'?(guCategories[c]||c):c)}</option>`).join('')
}
function renderFormOptions(){
  const a=$('#txAccount').value;
  const b=$('#txToAccount').value;
  $('#txAccount').innerHTML=accountOptions(a);
  $('#txToAccount').innerHTML=accountOptions(b);
  const type=$('#transactionType').value;
  $('#txCategory').innerHTML=categoryOptions(type,$('#txCategory').value)
}
function accountRow(a){
  return `<div class="account-row ${a.type}"><span class="account-avatar">${a.type==='cash'?'₹':'B'}</span><div class="account-meta"><strong>${esc(a.name)}</strong><small>${t(a.type==='cash'?'cash':'bank')}</small></div><div class="account-amount">${money(accountBalance(a.id))}</div></div>`
}
function renderAccounts(){
  const rows=data.accounts.map(accountRow).join('');
  $('#dashboardAccounts').innerHTML=rows||emptyHtml('accounts');
  $('#allAccounts').innerHTML=data.accounts.map(a=>`<article class="account-card"><button class="remove-account" data-delete-account="${esc(a.id)}" aria-label="Delete account">×</button><div class="account-card-head"><span class="account-avatar">${a.type==='cash'?'₹':'B'}</span><div><h3>${esc(a.name)}</h3><p>${t(a.type==='cash'?'cash':'bank')}</p></div></div><span class="balance-label">${t('currentBalance')}</span><div class="balance-value">${money(accountBalance(a.id))}</div><p>${t('opening')}: ${money(a.opening)}</p></article>`).join('');
  renderFormOptions()
}
function txTitle(x){
  if(x.type==='transfer'){
    const from=data.accounts.find(a=>a.id===x.accountId)?.name||'?';
    const to=data.accounts.find(a=>a.id===x.toAccountId)?.name||'?';
    return `${from} → ${to}`
  }
  return lang==='gu'?(guCategories[x.category]||x.category||t('uncategorized')):(x.category||t('uncategorized'))
}
function txMeta(x){
  const acc=data.accounts.find(a=>a.id===x.accountId)?.name||'';
  const date=new Intl.DateTimeFormat(lang==='gu'?'gu-IN':'en-IN',{
    day:'numeric',month:'short',year:'numeric'
  }).format(new Date(x.date+'T12:00:00'));
  return [date,x.type==='transfer'?'':acc,x.note].filter(Boolean).map(esc).join(' · ')
}
function txRow(x,allowDelete=true){
  const sign=x.type==='income'?'+':x.type==='expense'?'-':'⇄ ';
  return `<div class="tx-row"><span class="tx-icon ${x.type}">${x.type==='income'?'↓':x.type==='expense'?'↑':'⇄'}</span><div class="tx-main"><strong>${esc(txTitle(x))}</strong><small>${txMeta(x)}</small></div><div class="tx-amount ${x.type}">${sign}${money(x.amount)}</div>${allowDelete?`<button class="delete-tx" data-delete-tx="${esc(x.id)}" aria-label="Delete transaction">×</button>`:''}</div>`}
function emptyHtml(kind='tx',filtered=false){return `<div class="empty-state"><span>${
    kind==='tx'?'⇅':'▣'
  }
  </span><strong>${filtered?t('noMatch'):t('noTransactions')}</strong>${
    kind==='tx'&&!filtered?`<small>${t('noTransactionsHelp')}</small>`:''
  }
  </div>`}
function sortedTransactions(){return [...data.transactions].sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt)}
function renderTransactionAccountFilter(){
  const select=$('#filterAccount');
  if(!select)return;
  const current=select.value||'all';
  const allLabel=t('allAccounts');
  select.innerHTML=`<option value="all">${esc(allLabel)}</option>`+data.accounts.map(a=>`<option value="${esc(a.id)}">${esc(a.name)} · ${t(a.type==='cash'?'cash':'bank')}</option>`).join('');
  select.value=current==='all'||data.accounts.some(a=>a.id===current)?current:'all';
  select.setAttribute('aria-label',t('filterByAccount'))
}

function renderTransactionCategoryFilter(){
  const select=$('#filterCategory');
  if(!select)return;
  const current=select.value||'all';
  const names=[...new Set([...categories.income,...categories.expense,...data.transactions.map(x=>x.category).filter(x=>x&&x!=='Transfer')])].sort((a,b)=>a.localeCompare(b));
  select.innerHTML=`<option value="all">${t('allCategories')}</option>`+names.map(name=>`<option value="${esc(name)}">${esc(name)}</option>`).join('');
  select.value=names.includes(current)?current:'all';
}
function renderBusinessReport(){
  const yearSelect=$('#businessYear');
  if(!yearSelect)return;
  const currentYear=new Date().getFullYear();
  const years=new Set([currentYear,...data.transactions.map(x=>Number(String(x.date||'').slice(0,4))).filter(y=>Number.isInteger(y)&&y>1900)]);
  const previous=yearSelect.value;
  yearSelect.innerHTML=[...years].sort((a,b)=>b-a).map(y=>`<option value="${y}">${y}</option>`).join('');
  yearSelect.value=years.has(Number(previous))?previous:String(currentYear);
  const year=Number(yearSelect.value);
  const monthNames=Array.from({length:12},(_,i)=>new Intl.DateTimeFormat(lang==='gu'?'gu-IN':'en-IN',{month:'long'}).format(new Date(year,i,1)));
  const monthly=Array.from({length:12},(_,i)=>({month:i,income:0,expense:0}));
  data.transactions.forEach(x=>{
    if(!String(x.date||'').startsWith(String(year)+'-')||String(x.category||'').toLowerCase()!=='business')return;
    const m=Number(String(x.date).slice(5,7))-1;
    if(m<0||m>11)return;
    if(x.type==='income')monthly[m].income+=Number(x.amount)||0;
    if(x.type==='expense')monthly[m].expense+=Number(x.amount)||0;
  });
  const totalIncome=monthly.reduce((s,m)=>s+m.income,0);
  const totalExpense=monthly.reduce((s,m)=>s+m.expense,0);
  const net=totalIncome-totalExpense;
  const status=net>0?t('businessProfit'):net<0?t('businessLoss'):t('businessBreakEven');
  $('#businessReportTotals').innerHTML=`<div class="business-total income"><small>${t('businessIncome')}</small><strong>${money(totalIncome)}</strong></div><div class="business-total expense"><small>${t('businessExpense')}</small><strong>${money(totalExpense)}</strong></div><div class="business-total ${net>=0?'profit':'loss'}"><small>${status}</small><strong>${net<0?'-':''}${money(Math.abs(net))}</strong></div>`;
  const rows=monthly.map((m,i)=>{const n=m.income-m.expense;return `<tr><td>${esc(monthNames[i])}</td><td class="positive">${money(m.income)}</td><td class="negative">${money(m.expense)}</td><td class="${n>0?'positive':n<0?'negative':'neutral'}"><strong>${n<0?'-':''}${money(Math.abs(n))}</strong><small>${n>0?t('businessProfit'):n<0?t('businessLoss'):t('businessBreakEven')}</small></td></tr>`}).join('');
  $('#businessMonthlyRows').innerHTML=rows+`<tr class="year-total"><td>${t('yearTotal')}</td><td>${money(totalIncome)}</td><td>${money(totalExpense)}</td><td class="${net>=0?'positive':'negative'}">${net<0?'-':''}${money(Math.abs(net))}</td></tr>`;
}
function renderCategoryManager(){
  const renderList=type=>categories[type].map(name=>`<div class="category-chip"><span>${esc(lang==='gu'?(guCategories[name]||name):name)}</span>${name.toLowerCase()==='business'?'<span class="category-lock" title="Protected">🔒</span>':`<button type="button" class="category-delete" data-delete-category="${esc(name)}" data-category-type="${type}" aria-label="${esc(t('deleteCategory'))} ${esc(name)}">×</button>`}</div>`).join('')||`<small class="category-empty">${t('noMatch')}</small>`;
  $('#expenseCategoryList').innerHTML=renderList('expense');
  $('#incomeCategoryList').innerHTML=renderList('income');
}
function addCategory(type,name){
  const clean=String(name||'').trim().replace(/\s+/g,' ').slice(0,32);
  if(!clean)throw new Error('category_required');
  if(!['income','expense'].includes(type))throw new Error('invalid_category_type');
  if(categories[type].some(x=>x.toLowerCase()===clean.toLowerCase()))throw new Error('category_exists');
  categories[type].push(clean);
  saveCategories();
  renderCategoryManager();
  renderFormOptions();
}
function removeCategory(type,name){
  if(String(name).toLowerCase()==='business'){toast(t('businessProtected'));return}
  categories[type]=categories[type].filter(x=>x!==name);
  saveCategories();
  renderCategoryManager();
  renderFormOptions();
  toast(t('categoryDeleted'));
}
function renderTransactions(){
  renderTransactionAccountFilter();
  const sorted=sortedTransactions();
  $('#recentTransactions').innerHTML=sorted.length?sorted.slice(0,5).map(x=>txRow(x,false)).join(''):emptyHtml();
  const type=$('#filterType').value;
  const month=$('#filterMonth').value;
  const accountId=$('#filterAccount')?.value||'all';
  const category=$('#filterCategory')?.value||'all';
  renderTransactionCategoryFilter();
  const filtered=sorted.filter(x=>{
    const accountMatch=accountId==='all'||x.accountId===accountId||(x.type==='transfer'&&x.toAccountId===accountId);
    const categoryMatch=category==='all'||x.category===category;
    return accountMatch&&(type==='all'||x.type===type)&&categoryMatch&&(!month||x.date.startsWith(month))
  });
  $('#allTransactions').innerHTML=filtered.length?filtered.map(x=>txRow(x,true)).join(''):emptyHtml('tx',data.transactions.length>0);
  const sums=totals(filtered);
  $('#transactionSummary').innerHTML=`<span>${t('filteredIncome')}: <strong>${money(sums.income)}</strong></span><span>${t('filteredExpense')}: <strong>${money(sums.expense)}</strong></span><span><strong>${filtered.length}</strong> ${t('entries')}</span>`;
  renderBusinessReport()
}
function renderSummary(){const sums=totals();const today=localDate();const todayTx=data.transactions.filter(x=>x.date===today);const todayExpense=todayTx.filter(x=>x.type==='expense').reduce((s,x)=>s+x.amount,0);$('#totalBalance').textContent=money(data.accounts.reduce((s,a)=>s+accountBalance(a.id),0));$('#totalIncome').textContent=money(sums.income);$('#totalExpense').textContent=money(sums.expense);$('#todayExpense').textContent=money(todayExpense);$('#todayTransactionCount').textContent=t('todayCount').replace('{n}',todayTx.length)}
function renderAll(){renderSummary();renderAccounts();renderTransactions();renderCategoryManager();renderFormOptions()}
function setTxType(type){if(type==='transfer'&&data.accounts.length<2){toast(t('needTwo'));showView('accounts');return}$('#transactionType').value=type;$$('.type-btn').forEach(b=>b.classList.toggle('active',b.dataset.type===type));const transfer=type==='transfer';$('#toAccountLabel').classList.toggle('hidden',!transfer);$('#categoryLabel').classList.toggle('hidden',transfer);$('#txToAccount').required=transfer;$('#txCategory').required=!transfer;if(!transfer)$('#txCategory').innerHTML=categoryOptions(type)}
function addTransaction(payload){const amount=Number(payload.amount);if(!Number.isFinite(amount)||amount<=0)throw new Error('invalid_amount');if(!data.accounts.some(a=>a.id===payload.accountId))throw new Error('invalid_account');if(payload.type==='transfer'){if(payload.accountId===payload.toAccountId)throw new Error('same_account');if(!data.accounts.some(a=>a.id===payload.toAccountId))throw new Error('invalid_to_account')}const tx={id:uid('tx'),type:payload.type,amount,date:payload.date||localDate(),accountId:payload.accountId,toAccountId:payload.type==='transfer'?payload.toAccountId:null,category:payload.type==='transfer'?'Transfer':(payload.category||'Other'),note:String(payload.note||'').slice(0,80),createdAt:Date.now()};data.transactions.push(tx);saveData();return tx}
function addAccount(payload){const name=String(payload.name||'').trim().slice(0,35);const opening=Number(payload.opening)||0;if(!name)throw new Error('invalid_name');const account={id:uid('acc'),name,type:payload.type==='cash'?'cash':'bank',opening:Math.max(0,opening),createdAt:Date.now()};data.accounts.push(account);saveData();return account}
function showView(name){$$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${name}`));$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('#pageTitle').textContent=t(name==='backup'?'backup':name);window.scrollTo({top:0,behavior:'smooth'})}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2400)}
function ask(title,message,action){$('#dialogTitle').textContent=title;$('#dialogMessage').textContent=message;pendingConfirm=action;$('#confirmDialog').showModal()}
$('#transactionForm').addEventListener('submit',e=>{e.preventDefault();const type=$('#transactionType').value;if(type==='transfer'&&$('#txAccount').value===$('#txToAccount').value){toast(t('sameAccount'));return}try{addTransaction({type,amount:$('#txAmount').value,date:$('#txDate').value,accountId:$('#txAccount').value,toAccountId:$('#txToAccount').value,category:$('#txCategory').value,note:$('#txNote').value});$('#txAmount').value='';$('#txNote').value='';toast(t('saved'))}catch{toast(t('invalidBackup'))}});
$('#accountForm').addEventListener('submit',e=>{e.preventDefault();try{addAccount({name:$('#accountName').value,type:$('#accountType').value,opening:$('#openingBalance').value});e.target.reset();$('#openingBalance').value='0';toast(t('accountAdded'))}catch{}});
$('#categoryForm').addEventListener('submit',e=>{e.preventDefault();try{addCategory($('#newCategoryType').value,$('#newCategoryName').value);$('#newCategoryName').value='';toast(t('categoryAdded'))}catch(error){toast(error.message==='category_exists'?t('categoryExists'):t('categoryRequired'))}});
$$('.type-btn').forEach(b=>b.addEventListener('click',()=>setTxType(b.dataset.type)));$$('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.jump)));$$('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
document.addEventListener('click',e=>{const category=e.target.closest('[data-delete-category]');if(category){const type=category.dataset.categoryType;const name=category.dataset.deleteCategory;ask(t('deleteCategory'),`${name}? ${t('categoryDeleteNote')}`,()=>removeCategory(type,name))}const tx=e.target.closest('[data-delete-tx]');if(tx)ask(t('deleteTxTitle'),t('deleteTxMessage'),()=>{data.transactions=data.transactions.filter(x=>x.id!==tx.dataset.deleteTx);saveData();toast(t('deleted'))});const acc=e.target.closest('[data-delete-account]');if(acc){if(data.transactions.some(x=>x.accountId===acc.dataset.deleteAccount||x.toAccountId===acc.dataset.deleteAccount)){toast(t('cannotDelete'));return}ask(t('deleteAccountTitle'),t('deleteAccountMessage'),()=>{data.accounts=data.accounts.filter(a=>a.id!==acc.dataset.deleteAccount);if(!data.accounts.length)data.accounts=structuredClone(defaultData.accounts);saveData();toast(t('accountDeleted'))})}});
$('#confirmDialog').addEventListener('close',()=>{if($('#confirmDialog').returnValue==='confirm'&&pendingConfirm)pendingConfirm();pendingConfirm=null});
$('#toggleCategoryManager').addEventListener('click',()=>{const panel=$('#categoryManagerPanel');const open=panel.classList.toggle('hidden')===false;$('#toggleCategoryManager').setAttribute('aria-expanded',String(open));$('#toggleCategoryManager span:first-child').textContent=t(open?'closeCategoryManager':'openCategoryManager');$('#toggleCategoryManager .toggle-chevron').textContent=open?'−':'＋'});
$('#toggleBusinessReport').addEventListener('click',()=>{const panel=$('#businessReportPanel');const open=panel.classList.toggle('hidden')===false;$('#toggleBusinessReport').setAttribute('aria-expanded',String(open));$('#toggleBusinessReport span:first-child').textContent=t(open?'closeBusinessReport':'openBusinessReport');$('#toggleBusinessReport .toggle-chevron').textContent=open?'−':'＋';if(open)renderBusinessReport()});
$('#filterAccount').addEventListener('change',renderTransactions);$('#filterType').addEventListener('change',renderTransactions);$('#filterCategory').addEventListener('change',renderTransactions);$('#filterMonth').addEventListener('change',renderTransactions);$('#businessYear').addEventListener('change',renderBusinessReport);$('#clearFilters').addEventListener('click',()=>{$('#filterAccount').value='all';$('#filterType').value='all';$('#filterCategory').value='all';$('#filterMonth').value='';renderTransactions()});
function pdfText(value){const cleaned=String(value??'').normalize('NFKD').replace(/[^\x20-\x7E]/g,'').replace(/\s+/g,' ').trim();
  return cleaned||'-'
}
function pdfMoney(value){
  return `INR ${new Intl.NumberFormat('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(value)||0)}`
}
function balanceBefore(accountId,beforeDate){
  const selected=accountId==='all'?data.accounts:data.accounts.filter(a=>a.id===accountId);
  let balance=selected.reduce((sum,a)=>sum+(Number(a.opening)||0),0);
  data.transactions.filter(x=>x.date<beforeDate).forEach(x=>{
    if(accountId==='all'){
      if(x.type==='income')balance+=x.amount;
      if(x.type==='expense')balance-=x.amount;
      return
    }
    if(x.type==='income'&&x.accountId===accountId)balance+=x.amount;
    if(x.type==='expense'&&x.accountId===accountId)balance-=x.amount;
    if(x.type==='transfer'&&x.accountId===accountId)balance-=x.amount;
    if(x.type==='transfer'&&x.toAccountId===accountId)balance+=x.amount
  });
  return balance
}
function buildStatementData(month,accountId){
  const start=`${month}-01`;
  const [year,monthNumber]=month.split('-').map(Number);
  const endDate=new Date(year,monthNumber,1);
  const end=`${endDate.getFullYear()}-${String(endDate.getMonth()+1).padStart(2,'0')}-01`;
  const account=accountId==='all'?null:data.accounts.find(a=>a.id===accountId);
  let running=balanceBefore(accountId,start);
  const opening=running;
  let income=0;
  let expense=0;
  const rows=[];
  const txs=[...data.transactions].filter(x=>x.date>=start&&x.date<end).sort((a,b)=>a.date.localeCompare(b.date)||a.createdAt-b.createdAt);
  txs.forEach(x=>{
    let debit=0,credit=0,include=accountId==='all'||x.accountId===accountId||x.toAccountId===accountId;
    if(!include)return;
    const from=data.accounts.find(a=>a.id===x.accountId)?.name||'Unknown';
    const to=data.accounts.find(a=>a.id===x.toAccountId)?.name||'Unknown';
    let description='';
    if(x.type==='income'){
      if(accountId!=='all'&&x.accountId!==accountId)return;
      credit=x.amount;
      income+=x.amount;
      description=`Income - ${x.category||'Other'}${accountId==='all'?` (${
        from
      })`:''}`
    }
    else if(x.type==='expense'){
      if(accountId!=='all'&&x.accountId!==accountId)return;
      debit=x.amount;
      expense+=x.amount;
      description=`Expense - ${x.category||'Other'}${accountId==='all'?` (${
        from
      })`:''}`
    }
    else{
      description=`Transfer - ${from} to ${to}`;
      if(accountId==='all'){
        debit=x.amount;
        credit=x.amount
      }
      else if(x.accountId===accountId)debit=x.amount;
      else if(x.toAccountId===accountId)credit=x.amount
    }
    running+=credit-debit;
    const note=pdfText(x.note);
    if(note!=='-')description+=` | ${note}`;
    rows.push({
      date:x.date,description:pdfText(description),debit,credit,balance:running
    })
  });
  return {
    month,accountName:account?pdfText(account.name):'All Accounts',opening,income,expense,closing:running,rows
  }
}
async function downloadMonthlyStatement(){
  const month=$('#statementMonth').value;
  const accountId=$('#statementAccount').value||'all';
  if(!month){
    toast(t('pdfError'));
    return
  }
  const button=$('#downloadStatementBtn');
  button.disabled=true;
  button.textContent=lang==='gu'?'PDF બની રહી છે…':'Creating PDF…';
  try{
    if(!window.PDFLib)throw new Error('PDF library unavailable');
    const {
      PDFDocument,StandardFonts,rgb
    }
    =window.PDFLib;
    const report=buildStatementData(month,accountId);
    const pdf=await PDFDocument.create();
    pdf.setTitle(`My Money Statement - ${month}`);
    pdf.setAuthor('My Money Tracker');
    pdf.setSubject(`Monthly statement for ${report.accountName}`);
    const regular=await pdf.embedFont(StandardFonts.Helvetica);
    const bold=await pdf.embedFont(StandardFonts.HelveticaBold);
    const width=595.28,height=841.89,margin=36;
    let page,y,pageNumber=0;
    const rightText=(text,xRight,yPos,size=8,font=regular,color=rgb(.12,.18,.3))=>{
      const safe=pdfText(text);
      page.drawText(safe,{
        x:xRight-font.widthOfTextAtSize(safe,size),y:yPos,size,font,color
      })
    };
    const addTableHeader=()=>{
      page.drawRectangle({
        x:margin,y:y-20,width:width-margin*2,height:22,color:rgb(.92,.94,.98)
      });
      page.drawText('Date',{
        x:margin+5,y:y-14,size:8,font:bold,color:rgb(.13,.24,.55)
      });
      page.drawText('Description',{
        x:105,y:y-14,size:8,font:bold,color:rgb(.13,.24,.55)
      });
      rightText('Debit',397,y-14,8,bold,rgb(.13,.24,.55));
      rightText('Credit',466,y-14,8,bold,rgb(.13,.24,.55));
      rightText('Balance',width-margin-5,y-14,8,bold,rgb(.13,.24,.55));
      y-=25
    };
    const addPage=(first=false)=>{
      page=pdf.addPage([width,height]);
      pageNumber++;
      page.drawRectangle({
        x:0,y:height-82,width,height:82,color:rgb(.07,.22,.65)
      });
      page.drawText('MY MONEY',{
        x:margin,y:height-42,size:20,font:bold,color:rgb(1,1,1)
      });
      page.drawText('MONTHLY ACCOUNT STATEMENT',{
        x:margin,y:height-62,size:9,font:regular,color:rgb(.82,.88,1)
      });
      rightText(`Page ${pageNumber}`,width-margin,height-48,9,bold,rgb(1,1,1));
      if(first){
        const labelMonth=new Intl.DateTimeFormat('en-IN',{
          month:'long',year:'numeric'
        }).format(new Date(`${report.month}-01T12:00:00`));
        page.drawText(`Statement period: ${labelMonth}`,{
          x:margin,y:height-112,size:11,font:bold,color:rgb(.1,.15,.28)
        });
        page.drawText(`Account: ${report.accountName}`,{
          x:margin,y:height-130,size:9,font:regular,color:rgb(.35,.4,.5)
        });
        page.drawText(`Generated: ${new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric'}).format(new Date())}`,{
          x:margin,y:height-146,size:8,font:regular,color:rgb(.45,.5,.6)
        });
        const cards=[['OPENING',report.opening],['INCOME',report.income],['EXPENSE',report.expense],['CLOSING',report.closing]];
        cards.forEach((item,index)=>{
          const x=margin+index*130;
          page.drawRectangle({
            x,y:height-218,width:120,height:52,color:index===1?rgb(.9,.98,.95):index===2?rgb(1,.93,.94):rgb(.93,.95,1),borderColor:rgb(.84,.88,.95),borderWidth:.5
          });
          page.drawText(item[0],{
            x:x+8,y:height-184,size:7,font:bold,color:rgb(.4,.46,.58)
          });
          page.drawText(pdfMoney(item[1]),{
            x:x+8,y:height-204,size:9,font:bold,color:rgb(.08,.15,.3)
          });
        });
        y=height-250
      }
      else{
        page.drawText(`${report.month} · ${report.accountName}`,{
          x:margin,y:height-105,size:9,font:bold,color:rgb(.15,.2,.32)
        });
        y=height-125
      }
      addTableHeader()
    };
    addPage(true);
    if(!report.rows.length){
      page.drawText('No transactions in this period.',{
        x:margin+5,y:y-25,size:10,font:regular,color:rgb(.45,.5,.6)
      });
      y-=42
    }
    else{
      report.rows.forEach(row=>{
        if(y<82)addPage(false);
        const date=row.date.split('-').reverse().join('/');
        const desc=row.description.length>43?`${row.description.slice(0,40)}...`:row.description;
        page.drawText(date,{
          x:margin+5,y:y-15,size:7.5,font:regular,color:rgb(.2,.25,.34)
        });
        page.drawText(desc,{
          x:105,y:y-15,size:7.5,font:regular,color:rgb(.2,.25,.34)
        });
        if(row.debit)rightText(pdfMoney(row.debit),397,y-15,7.2,regular,rgb(.72,.18,.25));
        if(row.credit)rightText(pdfMoney(row.credit),466,y-15,7.2,regular,rgb(.05,.55,.36));
        rightText(pdfMoney(row.balance),width-margin-5,y-15,7.2,bold,rgb(.1,.16,.28));
        page.drawLine({
          start:{
            x:margin,y:y-21
          },end:{
            x:width-margin,y:y-21
          },thickness:.35,color:rgb(.9,.92,.95)
        });
        y-=24
      })
    }
    if(y<120)addPage(false);
    page.drawRectangle({
      x:width-250,y:y-62,width:214,height:58,color:rgb(.95,.97,1),borderColor:rgb(.8,.85,.94),borderWidth:.6
    });
    page.drawText('Closing Balance',{
      x:width-238,y:y-28,size:8,font:bold,color:rgb(.32,.38,.5)
    });
    rightText(pdfMoney(report.closing),width-48,y-48,13,bold,rgb(.07,.22,.65));
    pdf.getPages().forEach((p,index)=>{
      p.drawText(`My Money Tracker · Page ${index+1} of ${pdf.getPageCount()}`,{
        x:margin,y:20,size:7,font:regular,color:rgb(.55,.59,.67)
      })
    });
    const bytes=await pdf.save();
    const blob=new Blob([bytes],{
      type:'application/pdf'
    });
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    const safeAccount=report.accountName.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'all-accounts';
    link.href=url;
    link.download=`my-money-statement-${report.month}-${safeAccount}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    toast(t('pdfDownloaded'))
  }
  catch(error){
    console.error(error);
    toast(t('pdfError'))
  }
  finally{
    button.disabled=false;
    button.textContent=t('downloadStatement')
  }
}
$('#downloadStatementBtn').addEventListener('click',downloadMonthlyStatement);
$('#exportBtn').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify({
    app:'My Money',version:2,exportedAt:new Date().toISOString(),data,categories
  },null,2)],{
    type:'application/json'
  });
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`my-money-backup-${localDate()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast(t('backupDownloaded'))
});
$('#importInput').addEventListener('change',async e=>{
  const file=e.target.files[0];
  if(!file)return;
  try{
    const parsed=JSON.parse(await file.text());
    const restored=parsed.data||parsed;
    if(!safeData(restored))throw new Error();
    data=restored;
    if(parsed.categories&&Array.isArray(parsed.categories.income)&&Array.isArray(parsed.categories.expense)){categories={income:parsed.categories.income,expense:parsed.categories.expense};saveCategories()}else{categories=structuredClone(defaultCategories);saveCategories()}
    saveData();
    toast(t('backupRestored'))
  }
  catch{
    toast(t('invalidBackup'))
  }
  e.target.value=''
});
$('#resetBtn').addEventListener('click',()=>ask(t('resetTitle'),t('resetMessage'),()=>{
  data=structuredClone(defaultData);
  categories=structuredClone(defaultCategories);saveCategories();
  localStorage.removeItem(STORAGE_KEY);
  saveData();
  toast(t('resetDone'))
}));
$('[data-action="focus-entry"]').addEventListener('click',()=>{
  showView('dashboard');
  setTimeout(()=>$('#txAmount').focus(),250)
});
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  deferredInstall=e;
  $('#installBtn').classList.remove('hidden')
});
$('#installBtn').addEventListener('click',async()=>{
  if(!deferredInstall)return;
  deferredInstall.prompt();
  await deferredInstall.userChoice;
  deferredInstall=null;
  $('#installBtn').classList.add('hidden')
});
function registerWebMCP(){
  const mc=document.modelContext;
  if(!mc?.registerTool)return;
  const reg=tool=>{
    try{
      Promise.resolve(mc.registerTool(tool)).catch(()=>{
      })
    }
    catch{
    }
  };
  reg({
    name:'get_finance_summary',title:'Get finance summary',description:'Read current total balance, income, expense and individual account balances.',inputSchema:{
      type:'object',properties:{
      },additionalProperties:false
    },annotations:{
      readOnlyHint:true,untrustedContentHint:false
    },execute:()=>({
      totalBalance:data.accounts.reduce((s,a)=>s+accountBalance(a.id),0),...totals(),accounts:data.accounts.map(a=>({
        id:a.id,name:a.name,type:a.type,balance:accountBalance(a.id)
      }))
    })
  });
  reg({
    name:'add_finance_transaction',title:'Add transaction',description:'Add an income, expense or transfer to the same local finance records used by the visible form.',inputSchema:{
      type:'object',properties:{
        type:{
          type:'string',enum:['income','expense','transfer']
        },amount:{
          type:'number',exclusiveMinimum:0
        },date:{
          type:'string'
        },accountId:{
          type:'string'
        },toAccountId:{
          type:'string'
        },category:{
          type:'string'
        },note:{
          type:'string'
        }
      },required:['type','amount','accountId'],additionalProperties:false
    },annotations:{
      readOnlyHint:false,untrustedContentHint:false
    },execute:p=>{
      const tx=addTransaction(p);
      toast(t('saved'));
      return {
        id:tx.id,status:'saved'
      }
    }
  });
  reg({
    name:'add_finance_account',title:'Add account',description:'Add a bank, cash or wallet account to the local finance tracker.',inputSchema:{
      type:'object',properties:{
        name:{
          type:'string'
        },type:{
          type:'string',enum:['bank','cash']
        },opening:{
          type:'number',minimum:0
        }
      },required:['name','type'],additionalProperties:false
    },annotations:{
      readOnlyHint:false,untrustedContentHint:false
    },execute:p=>{
      const a=addAccount(p);
      toast(t('accountAdded'));
      return {
        id:a.id,status:'saved'
      }
    }
  })
}
$('#txDate').value=localDate();
$('#statementMonth').value=localDate().slice(0,7);
setLanguage(lang);
setTxType('expense');
registerWebMCP();
if('serviceWorker'in navigator)window.addEventListener('load',async()=>{
  try{
    const registration=await navigator.serviceWorker.register('./service-worker.js',{
      scope:'./',updateViaCache:'none'
    });
    registration.update().catch(()=>{
    })
  }
  catch(error){
    console.error('Service worker registration failed',error)
  }
});