declare module 'facebook-nodejs-business-sdk' {
  export class FacebookAdsApi {
    static init(accessToken: string): FacebookAdsApi
  }

  export class ServerEvent {
    setEventName(name: string): ServerEvent
    setEventTime(timestamp: number): ServerEvent
    setEventId(eventId: string): ServerEvent
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
    setCountries(countries: string[]): UserData
    setCountryCodes(codes: string[]): UserData
    setClientIpAddress(ip: string): UserData
    setClientUserAgent(ua: string): UserData
    setFbp(fbp: string): UserData
    setFbc(fbc: string): UserData
    setExternalIds(ids: string[]): UserData
    setGenders(genders: string[]): UserData
    setStates(states: string[]): UserData
    setZips(zips: string[]): UserData
  }

  export class CustomData {
    setValue(value: number): CustomData
    setCurrency(currency: string): CustomData
    setContentIds(ids: string[]): CustomData
    setContentType(type: string): CustomData
    setContents(contents: Content[]): CustomData
    setNumItems(num: number): CustomData
  }

  export class Content {
    setId(id: string): Content
    setQuantity(quantity: number): Content
    setItemPrice(price: number): Content
  }
}

