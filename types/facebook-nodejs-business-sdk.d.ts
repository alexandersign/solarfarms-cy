declare module 'facebook-nodejs-business-sdk' {
  export class FacebookAdsApi {
    static init(accessToken: string): FacebookAdsApi
  }

  export class ServerEvent {
    setEventName(name: string): ServerEvent
    setEventTime(timestamp: number): ServerEvent
    setUserData(userData: UserData): ServerEvent
    setCustomData(customData: CustomData): ServerEvent
    setActionSource(source: string): ServerEvent
    setEventSourceUrl(url: string): ServerEvent
  }

  export class EventRequest {
    constructor(accessToken: string, pixelId: string)
    setEvents(events: ServerEvent[]): EventRequest
    execute(): Promise<any>
  }

  export class UserData {
    setEmails(emails: string[]): UserData
    setPhones(phones: string[]): UserData
    setFirstNames(names: string[]): UserData
    setLastNames(names: string[]): UserData
    setCities(cities: string[]): UserData
    setCountryCodes(codes: string[]): UserData
    setClientIpAddress(ip: string): UserData
    setClientUserAgent(ua: string): UserData
    setFbp(fbp: string): UserData
    setFbc(fbc: string): UserData
  }

  export class CustomData {
    setValue(value: number): CustomData
    setCurrency(currency: string): CustomData
  }
}

