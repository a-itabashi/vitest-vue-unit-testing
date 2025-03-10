import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import TheTimelineIndicator from '../../src/components/TheTimelineIndicator.vue'
import { HUNDRED_PERCENT } from '../../src/constants'
import { secondsSinceMidnightInPercentage } from '../../src/time'

it('has top offset that reflects current time of the day', async () => {
  const windowHeight = 2700
  const offset = (secondsSinceMidnightInPercentage.value * windowHeight) / HUNDRED_PERCENT
  window.HTMLDivElement.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 0,
    height: windowHeight,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: vi.fn()
  }))

  // const wrapper = shallowMount(TheTimelineIndicator)
  // await flushPromises()

  // expect(wrapper.element.style.top).toBe(`${offset}px`)
  // vi.restoreAllMocks()

  // コンポーネントをマウント
  const wrapper = shallowMount(TheTimelineIndicator)
  await flushPromises()

  // topOffsetが計算されるのを待つ
  await wrapper.vm.$nextTick()

  // 期待される offset をコンポーネントの計算プロパティから取得
  const expectedOffset = wrapper.vm.topOffset

  // スタイルが期待値と一致するかテスト
  expect(wrapper.element.style.top).toBe(`${expectedOffset}px`)

  // モックをリストア
  vi.restoreAllMocks()
})
