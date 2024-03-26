# scp -r dist/*  root@123.56.221.44:/www/resource-shoppe
rm -rf ./dist
pnpm run build
cd ./dist
git init
# git remote rm origin
git remote add origin git@gitee_maiyunshare:maiyunshare/portal.git
# git remote add origin git@gitee.com:yinxi-eikon-group/resource-shoppe.git
git pull origin master
git add .
git commit -m 'chore: 项目构建'
git push origin main:master -f

# 关联远程分支
# git branch --set-upstream-to=origin/master master

# 查看关联远程仓库
# git remote show origin
