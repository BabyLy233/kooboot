interface challengeD {
  type: number
  channel_type: string
  challenge: string
  verify_token: string
}

interface joinChannelD {
  channel_type: string
  type: number
  target_id: string
  author_id: string
  content: string
  extra: {
    type: string
    body: {
      user_id: string
      channel_id: string
      joined_at: number
    }
  }
  msg_id: string
  msg_timestamp: number
  nonce: string
  from_type: number
  verify_token: string
}

interface exitChannelD {
  channel_type: string
  type: number
  target_id: string
  author_id: string
  content: string
  extra: {
    type: string
    body: {
      user_id: string
      channel_id: string
      exited_at: number
    }
  }
  msg_id: string
  msg_timestamp: number
  nonce: string
  from_type: number
  verify_token: string
}

interface messageD {
  channel_type: string
  type: number
  target_id: string
  author_id: string
  content: string
  extra: {
    type: number
    code: string
    guild_id: string
    channel_name: string
    author: {
      id: string
      username: string
      identify_num: string
      online: boolean
      os: string
      status: 0 | 1 | 10
      avatar: string
      vip_avatar: string
      banner: string
      nickname: string
      roles: Array<number>
      is_vip: boolean
      is_ai_reduce_noise: boolean
      is_personal_card_bg: boolean
      bot: boolean
    }
    visible_only: null
    mention: Array<string>
    mention_all: boolean
    mention_roles: Array<number>
    mention_here: false
    nav_channels: Array<string>
    kmarkdown: {
      raw_content: string
      mention_part: []
      mention_role_part: []
      channel_part: []
    }
    last_msg_content: string
    send_msg_device: 1
  }
  msg_id: string
  msg_timestamp: number
  nonce: string
  from_type: 1
  verify_token: string
}

interface baseEvent<T> {
  s: number
  d: T
  sn?: number
}

export { baseEvent, challengeD, messageD, joinChannelD, exitChannelD }
