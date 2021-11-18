let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/program/node/expenseMeter
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +41 index.js
badd +57 controller/User.js
badd +1 models/UserModel.js
badd +48 Utility.js
badd +1 models/TransactionModel.js
badd +30 controller/Transactions.js
badd +5 routes/User.js
badd +31 tests/api.js
badd +3 tests/users.js
badd +1 routes/Transactions.js
badd +4 tests/trans.js
badd +4 models/Categorymodel.js
badd +39 controller/Category.js
badd +13 routes/Category.js
argglobal
%argdel
edit controller/User.js
argglobal
balt routes/User.js
let s:l = 57 - ((25 * winheight(0) + 22) / 44)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 57
normal! 015|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0&& getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
