## ADDED Requirements

### Requirement: 登录页面展示
必须提供登录页面，包含用户名、密码输入框和登录按钮。

#### Scenario: 访问登录页
- **WHEN** 用户访问 /login 路由
- **THEN** 页面居中显示登录表单，包含邮箱/用户名输入框、密码输入框和登录按钮

#### Scenario: 表单验证
- **WHEN** 用户提交空表单或格式错误的邮箱
- **THEN** 输入框下方显示对应的错误提示信息，阻止提交

### Requirement: 登录状态管理
登录成功后必须保存认证状态，未登录用户访问受保护路由应重定向到登录页。

#### Scenario: 登录成功
- **WHEN** 用户使用正确凭据点击登录
- **THEN** 系统将凭据保存到 localStorage 并重定向到 /dashboard

#### Scenario: 未登录重定向
- **WHEN** 用户未登录且直接访问 /dashboard
- **THEN** 系统自动重定向到 /login 页面

#### Scenario: 退出登录
- **WHEN** 用户在用户菜单中点击"退出登录"
- **THEN** 清除本地存储的认证信息并重定向到 /login
