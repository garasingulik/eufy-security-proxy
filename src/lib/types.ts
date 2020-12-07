export * from 'tswrap'

import { Either } from 'fp-ts/lib/Either'
import * as iots from 'io-ts'

export const parseData = <T>(data: any, structure: iots.TypeC<any> | iots.IntersectionC<any>): Either<iots.Errors, any> | T => {
  const decoded = structure.decode(data)

  if (decoded._tag === 'Left') {
    return decoded
  }

  return decoded.right as T
}

export const isParseError = (arg: any): arg is Either<iots.Errors, any> => {
  return arg && arg._tag === 'Left'
}

export const asyncForEach = async <T>(array: T[], callback: (el: T, i: number, a: T[]) => void) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const echo = () => {
  return 'OK'
}

/* Register Types Here */

export const HelloRequest = iots.interface({
  name!: iots.string
})

export type HelloRequestType = iots.TypeOf<typeof HelloRequest>

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

export interface LoginParam {
  param_type: number
  param_value: string
}

export interface LoginInfo {
  user_id: string
  email: string
  nick_name: string
  auth_token: string
  token_expires_at: number
  avatar: string
  invitation_code: string
  inviter_code: string
  verify_code_url: string
  mac_addr: string
  domain: string
  ab_code: string
  geo_key: string
  privilege: number
  phone: string
  phone_code: string
  params: LoginParam[]
  trust_list: any[]
}

export interface Station {
  station_sn: string
  station_name: string
  station_model: string
  main_sw_version: string
  main_hw_version: string
  p2p_did: string
  push_did: string
  ndt_did: string
  p2p_conn: string
  app_conn: string
  binded: boolean
  setup_code: string
  setup_id: string
  wifi_mac: string
}

export interface Member {
  family_id: number
  station_sn: string
  admin_user_id: string
  member_user_id: string
  short_user_id: string
  member_type: number
  permissions: number
  member_nick: string
  action_user_id: string
  fence_state: number
  extra: string
  member_avatar: string
  create_time: number
  update_time: number
  status: number
  email: string
  nick_name: string
  avatar: string
  action_user_email: string
  action_user_name: string
}

export interface DeviceParam {
  param_id: number
  device_sn: string
  param_type: number
  param_value: string
  create_time: number
  update_time: number
  status: number
}

export interface MiniDeviceInfo {
  device_id: number
  device_sn: string
  device_name: string
  device_model: string
  station_sn: string
  wifi_mac: string
  main_sw_version: string
  main_hw_version: string
  sec_sw_version: string
  sec_hw_version: string
  charging_days: number
  // Typo here is from Eufy
  charing_total: number
  charging_reserve: number
  charging_missing: number
  battery_usage_last_week: number
  // custom field
  battery_percentage: number
}

export interface DeviceInfo extends MiniDeviceInfo {
  is_init_complete: boolean
  time_zone: string
  device_type: number
  device_channel: number
  schedule: string
  schedulex: string
  sub1g_mac: string
  sector_id: number
  event_num: number
  wifi_ssid: string
  ip_addr: string
  main_sw_time: number
  sec_sw_time: number
  bind_time: number
  cover_path: string
  cover_time: number
  local_ip: string
  language: string
  sku_number: string
  lot_number: string
  create_time: number
  update_time: number
  status: number
  svr_domain: string
  svr_port: number
  station_conn: Station
  family_num: number
  member: Member
  permission?: any
  params: DeviceParam[]
  pir_total: number
  pir_none: number
  pir_missing: number
  week_pir_total: number
  week_pir_none: number
  month_pir_total: number
  month_pir_none: number
}

export const StreamRequestRequired = iots.interface({
  device_sn: iots.string,
  station_sn: iots.string
})

export const StreamRequestOptional = iots.partial({
  proto: iots.number,
})

export const StreamRequest = iots.intersection([StreamRequestRequired, StreamRequestOptional])
export type StreamRequestType = iots.TypeOf<typeof StreamRequest>

export interface StreamUrl {
  url: string
}
