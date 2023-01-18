import { AuthClient } from '@valapi/auth'
import { WebClient } from '@valapi/web-client'
import { ValorantApiCom } from '@valapi/valorant-api.com'

import { Region } from '@valapi/lib'

// const username = 'dasima2022'
// const password = 'wjx001220'

const config = {
  region: Region.Default.Asia_Pacific,
  throwOnError: true,
}

const ApiClient = new ValorantApiCom({
  language: 'zh-TW',
})

const login = async (username: string, password: string) => {
  const authClient = new AuthClient(config)
  await authClient.login(username, password)
  return authClient
}

export const getShopDailyOffers = async (webClient: WebClient, subject: string) => {
  try {
    const { data: storefrontData } = await webClient.Store.getStorefront(subject)
    const itemIds: string[] = storefrontData.SkinsPanelLayout.SingleItemOffers
    const offers = storefrontData.SkinsPanelLayout.SingleItemStoreOffers

    const infos: any[] = []

    for (const id of itemIds) {
      const { data: skinLevelData } = await ApiClient.Weapons.getSkinLevelByUuid(id)
      const name = skinLevelData.data?.displayName || ''
      const icon = skinLevelData.data?.displayIcon || ''
      infos.push({
        name,
        icon,
      })
    }

    const res = itemIds.map((_, i) => {
      const item = offers[i]
      if (!item)
        return {
          price: 0,
          ...infos[i],
        }
      return {
        price: Object.values(item.Cost)[0],
        ...infos[i],
      }
    })
    return res
  } catch (e) {
    console.log(e)
  }
}

const getPlayerInfo = async (webClient: WebClient, subject: string) => {
  try {
    const { data } = await webClient.AccountXP.getPlayer(subject)
    console.log(data)
  } catch {}
}

export const initAuth = async (username: string, password: string) => {
  const authClient = await login(username, password)

  const subject = authClient.getSubject()
  const webClient = new WebClient(config)
  webClient.fromJSON(authClient.toJSON())

  return { webClient, subject }
}
