# 职脉深聊 - API接口文档

## 基础信息

- **Base URL**: `https://api.zhimai-shenliao.com/v1`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

## 通用响应格式

### 成功响应
```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

## 认证接口

### 用户注册
```
POST /auth/register
```

**请求体**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "job_seeker|mentor"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "username": "string",
    "email": "string",
    "role": "string",
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

---

### 用户登录
```
POST /auth/login
```

**请求体**:
```json
{
  "email": "string",
  "password": "string"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "username": "string",
    "email": "string",
    "role": "string",
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

---

### 刷新Token
```
POST /auth/refresh
```

**请求头**:
```
Authorization: Bearer {refresh_token}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

---

## 导师接口

### 获取导师列表
```
GET /mentors
```

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| limit | integer | 否 | 每页数量，默认20 |
| industry | string | 否 | 行业筛选 |
| skill | string | 否 | 技能标签 |
| min_price | number | 否 | 最低价格 |
| max_price | number | 否 | 最高价格 |
| trust_score | integer | 否 | 最低信任分数 |

**响应**:
```json
{
  "success": true,
  "data": {
    "mentors": [
      {
        "id": "uuid",
        "display_name": "string",
        "title": "string",
        "company_display": "string",
        "privacy_level": "anonymous|partial|full",
        "price_per_30min": 300.00,
        "trust_score": 95,
        "has_verified_badge": true,
        "skills": ["string"],
        "rating": 4.8,
        "review_count": 120
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

---

### 获取导师详情
```
GET /mentors/{mentor_id}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "display_name": "string",
    "title": "string",
    "company_display": "string",
    "years_experience": 10,
    "bio": "string",
    "privacy_level": "anonymous|partial|full",
    "price_per_30min": 300.00,
    "is_available": true,
    "trust_score": 95,
    "has_verified_badge": true,
    "skills": ["string"],
    "rating": 4.8,
    "review_count": 120,
    "availability": [
      {
        "day_of_week": 1,
        "start_time": "09:00:00",
        "end_time": "18:00:00"
      }
    ],
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "string",
        "is_anonymous": false,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

### 更新导师资料（仅导师）
```
PUT /mentors/profile
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "display_name": "string",
  "title": "string",
  "bio": "string",
  "privacy_level": "anonymous|partial|full",
  "price_per_30min": 300.00,
  "skills": ["string"]
}
```

---

### 设置可预约时间（仅导师）
```
PUT /mentors/availability
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "availability": [
    {
      "day_of_week": 1,
      "start_time": "09:00:00",
      "end_time": "18:00:00"
    }
  ]
}
```

---

## 身份验证接口

### 发送企业邮箱验证码
```
POST /verification/email/send
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "email": "string@company.com"
}
```

**响应**:
```json
{
  "success": true,
  "message": "验证码已发送"
}
```

---

### 验证企业邮箱
```
POST /verification/email/verify
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "email": "string@company.com",
  "code": "123456"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "trust_score_increase": 30
  }
}
```

---

### 上传身份文件
```
POST /verification/document/upload
```

**认证**: 需要JWT Token

**请求体**: multipart/form-data
| 字段 | 类型 | 必填 |
|------|------|------|
| document_type | string | 是 (employee_card, employment_proof) |
| file | file | 是 |

**响应**:
```json
{
  "success": true,
  "data": {
    "document_id": "uuid",
    "status": "pending_ai_redaction"
  }
}
```

---

### 连接社交账号
```
POST /verification/social/connect
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "platform": "linkedin|maimai",
  "profile_url": "string"
}
```

---

### 获取信任分数
```
GET /verification/trust-score
```

**认证**: 需要JWT Token

**响应**:
```json
{
  "success": true,
  "data": {
    "score": 85,
    "email_verified": true,
    "document_verified": true,
    "social_verified": false,
    "badge_level": "gold"
  }
}
```

---

## 预约接口

### 创建预约
```
POST /appointments
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "mentor_id": "uuid",
  "scheduled_at": "2024-01-01T10:00:00Z",
  "duration_minutes": 30,
  "topic": "求职面试准备"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "appointment_id": "uuid",
    "status": "pending",
    "price": 300.00,
    "payment_required": true
  }
}
```

---

### 获取预约列表
```
GET /appointments
```

**认证**: 需要JWT Token

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 否 | 状态筛选 |
| role | string | 否 | as_job_seeker|as_mentor |

**响应**:
```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "uuid",
        "mentor": {
          "id": "uuid",
          "display_name": "string"
        },
        "job_seeker": {
          "id": "uuid",
          "display_name": "string"
        },
        "scheduled_at": "2024-01-01T10:00:00Z",
        "duration_minutes": 30,
        "topic": "string",
        "status": "pending",
        "price": 300.00
      }
    ]
  }
}
```

---

### 确认预约（仅导师）
```
PUT /appointments/{appointment_id}/confirm
```

**认证**: 需要JWT Token

---

### 取消预约
```
PUT /appointments/{appointment_id}/cancel
```

**认证**: 需要JWT Token

---

## 支付接口

### 创建支付订单
```
POST /payments
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "appointment_id": "uuid"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "payment_id": "uuid",
    "amount": 300.00,
    "platform_fee": 30.00,
    "payment_url": "https://payment-gateway.com/xxx"
  }
}
```

---

### 支付回调
```
POST /payments/callback
```

（由支付网关调用）

---

## 聊天接口

### 获取会话列表
```
GET /chat/conversations
```

**认证**: 需要JWT Token

**响应**:
```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "uuid",
        "other_participant": {
          "id": "uuid",
          "display_name": "string",
          "avatar_url": "string"
        },
        "last_message": {
          "content": "string",
          "created_at": "2024-01-01T00:00:00Z"
        },
        "unread_count": 2
      }
    ]
  }
}
```

---

### 获取消息历史
```
GET /chat/conversations/{conversation_id}/messages
```

**认证**: 需要JWT Token

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| before | string | 否 | 时间戳，获取此时间之前的消息 |
| limit | integer | 否 | 数量，默认50 |

**响应**:
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "sender_id": "uuid",
        "encrypted_content": "string",
        "content_type": "text",
        "is_read": true,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

### 发送消息
```
POST /chat/conversations/{conversation_id}/messages
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "encrypted_content": "string",
  "content_type": "text|image|file"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "message_id": "uuid",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 创建会话
```
POST /chat/conversations
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "participant_id": "uuid",
  "appointment_id": "uuid"
}
```

---

## 评价接口

### 提交评价
```
POST /reviews
```

**认证**: 需要JWT Token

**请求体**:
```json
{
  "appointment_id": "uuid",
  "rating": 5,
  "comment": "非常专业的指导",
  "is_anonymous": false
}
```

---

### 获取导师评价
```
GET /mentors/{mentor_id}/reviews
```

**响应**:
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "string",
        "is_anonymous": false,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "average_rating": 4.8,
    "total_reviews": 120
  }
}
```

---

## WebSocket事件

### 连接
```
wss://api.zhimai-shenliao.com/v1/ws?token={jwt_token}
```

### 事件类型

#### 新消息
```json
{
  "type": "new_message",
  "data": {
    "conversation_id": "uuid",
    "message": {
      "id": "uuid",
      "sender_id": "uuid",
      "encrypted_content": "string",
      "content_type": "text",
      "created_at": "2024-01-01T00:00:00Z"
    }
  }
}
```

#### 消息已读
```json
{
  "type": "message_read",
  "data": {
    "conversation_id": "uuid",
    "message_id": "uuid",
    "read_at": "2024-01-01T00:00:00Z"
  }
}
```

#### 预约状态变更
```json
{
  "type": "appointment_status_update",
  "data": {
    "appointment_id": "uuid",
    "status": "confirmed"
  }
}
```

#### 正在输入
```json
{
  "type": "typing",
  "data": {
    "conversation_id": "uuid",
    "user_id": "uuid"
  }
}
```

---

## 错误码

| 错误码 | 说明 |
|--------|------|
| AUTH_FAILED | 认证失败 |
| INVALID_TOKEN | Token无效或过期 |
| USER_NOT_FOUND | 用户不存在 |
| MENTOR_NOT_FOUND | 导师不存在 |
| APPOINTMENT_NOT_FOUND | 预约不存在 |
| INVALID_INPUT | 输入参数无效 |
| PAYMENT_REQUIRED | 需要支付 |
| INSUFFICIENT_PERMISSION | 权限不足 |
| RATE_LIMIT_EXCEEDED | 请求频率超限 |
| INTERNAL_ERROR | 服务器内部错误 |
