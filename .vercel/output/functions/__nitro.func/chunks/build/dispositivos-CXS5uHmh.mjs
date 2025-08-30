import { ref, mergeProps, unref, reactive, watch, withCtx, createVNode, withModifiers, withDirectives, vModelText, createBlock, createTextVNode, openBlock, vModelSelect, computed, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { u as useUserStore } from './user-BEdD-0tD.mjs';
import { u as useDeviceStore } from './device-CfApmtSk.mjs';
import { u as useToastNotifications } from './useToastNotifications-DaJGJiXK.mjs';
import { B as BaseCard } from './BaseCard-BGENKLa5.mjs';
import { _ as _export_sfc } from './server.mjs';
import { E as EditIcon } from './EditIcon-bduVuxtD.mjs';
import { C as CustomSwitch } from './CustomSwitch-BAGBfqig.mjs';
import { _ as _sfc_main$6 } from './DeleteConfirmModal-w-LSssTG.mjs';
import 'pinia';
import './DeviceAPI-r0WuORwH.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '@iconify/vue';

const _sfc_main$5 = {
  __name: "DeviceForm",
  __ssrInlineRender: true,
  emits: ["device-added"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    useDeviceStore();
    useUserStore();
    const { deviceAdded, deviceAddError } = useToastNotifications();
    const isLoading = ref(false);
    const formData = reactive({
      deviceName: "",
      enddeviceId: "",
      appEui: "",
      devEui: "",
      appKey: "",
      ttnRegion: "",
      ttnAppId: "",
      ttnAccessKey: ""
    });
    const handleSubmit = async () => {
      isLoading.value = true;
      try {
        emit("device-added", { ...formData });
        deviceAdded(formData.deviceName);
        Object.keys(formData).forEach((key) => {
          formData[key] = "";
        });
      } catch (error) {
        console.error("Error al agregar dispositivo:", error);
        deviceAddError();
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCard, mergeProps({ title: "Registrar Nuevo Dispositivo" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6" data-device-form data-v-b8ed5c74${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b8ed5c74${_scopeId}><div data-v-b8ed5c74${_scopeId}><label for="deviceName" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> Device Name </label><input id="deviceName"${ssrRenderAttr("value", formData.deviceName)} type="text" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Ej: Sensor Riego 01" data-v-b8ed5c74${_scopeId}></div><div data-v-b8ed5c74${_scopeId}><label for="enddeviceId" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> EnddeviceID </label><input id="enddeviceId"${ssrRenderAttr("value", formData.enddeviceId)} type="text" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Ej: my-device-01" data-v-b8ed5c74${_scopeId}></div><div data-v-b8ed5c74${_scopeId}><label for="appEui" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> AppEUI </label><input id="appEui"${ssrRenderAttr("value", formData.appEui)} type="text" required pattern="[A-Fa-f0-9]{16}" maxlength="16" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="0123456789ABCDEF" data-v-b8ed5c74${_scopeId}><p class="mt-1 text-xs text-gray-400" data-v-b8ed5c74${_scopeId}>16 caracteres hexadecimales</p></div><div data-v-b8ed5c74${_scopeId}><label for="devEui" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> DevEUI </label><input id="devEui"${ssrRenderAttr("value", formData.devEui)} type="text" required pattern="[A-Fa-f0-9]{16}" maxlength="16" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="FEDCBA9876543210" data-v-b8ed5c74${_scopeId}><p class="mt-1 text-xs text-gray-400" data-v-b8ed5c74${_scopeId}>16 caracteres hexadecimales</p></div></div><div data-v-b8ed5c74${_scopeId}><label for="appKey" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> AppKey </label><input id="appKey"${ssrRenderAttr("value", formData.appKey)} type="text" required pattern="[A-Fa-f0-9]{32}" maxlength="32" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="0123456789ABCDEF0123456789ABCDEF" data-v-b8ed5c74${_scopeId}><p class="mt-1 text-xs text-gray-400" data-v-b8ed5c74${_scopeId}>32 caracteres hexadecimales</p></div><div class="border-t border-gray-600 pt-6" data-v-b8ed5c74${_scopeId}><h3 class="text-lg font-medium text-white mb-4 flex items-center" data-v-b8ed5c74${_scopeId}><svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b8ed5c74${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" data-v-b8ed5c74${_scopeId}></path></svg> Configuraci\xF3n TTN (The Things Network) </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-b8ed5c74${_scopeId}><div data-v-b8ed5c74${_scopeId}><label for="ttnRegion" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> TTN Region </label><select id="ttnRegion" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" data-v-b8ed5c74${_scopeId}><option value="" data-v-b8ed5c74${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "") : ssrLooseEqual(formData.ttnRegion, "")) ? " selected" : ""}${_scopeId}>Seleccionar regi\xF3n</option><option value="eu1" data-v-b8ed5c74${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "eu1") : ssrLooseEqual(formData.ttnRegion, "eu1")) ? " selected" : ""}${_scopeId}>Europe 1 (eu1)</option><option value="nam1" data-v-b8ed5c74${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "nam1") : ssrLooseEqual(formData.ttnRegion, "nam1")) ? " selected" : ""}${_scopeId}>North America 1 (nam1)</option><option value="au1" data-v-b8ed5c74${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "au1") : ssrLooseEqual(formData.ttnRegion, "au1")) ? " selected" : ""}${_scopeId}>Australia 1 (au1)</option><option value="as1" data-v-b8ed5c74${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "as1") : ssrLooseEqual(formData.ttnRegion, "as1")) ? " selected" : ""}${_scopeId}>Asia 1 (as1)</option></select><p class="mt-1 text-xs text-gray-400" data-v-b8ed5c74${_scopeId}>Regi\xF3n del servidor TTN</p></div><div data-v-b8ed5c74${_scopeId}><label for="ttnAppId" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> TTN Application ID </label><input id="ttnAppId"${ssrRenderAttr("value", formData.ttnAppId)} type="text" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="my-ttn-application" data-v-b8ed5c74${_scopeId}><p class="mt-1 text-xs text-gray-400" data-v-b8ed5c74${_scopeId}>ID de la aplicaci\xF3n en TTN</p></div><div data-v-b8ed5c74${_scopeId}><label for="ttnAccessKey" class="block text-sm font-medium text-white mb-2" data-v-b8ed5c74${_scopeId}> TTN Access Key </label><input id="ttnAccessKey"${ssrRenderAttr("value", formData.ttnAccessKey)} type="password" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" data-v-b8ed5c74${_scopeId}><p class="mt-1 text-xs text-gray-400" data-v-b8ed5c74${_scopeId}>Clave de acceso para la API TTN</p></div></div><div class="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg" data-v-b8ed5c74${_scopeId}><div class="flex items-start" data-v-b8ed5c74${_scopeId}><svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b8ed5c74${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b8ed5c74${_scopeId}></path></svg><div class="text-sm text-blue-300" data-v-b8ed5c74${_scopeId}><p class="font-medium mb-1" data-v-b8ed5c74${_scopeId}>Configuraci\xF3n TTN (Opcional)</p><p data-v-b8ed5c74${_scopeId}>Los campos TTN son necesarios para el control remoto de la bomba de riego. Puedes configurarlos ahora o m\xE1s tarde desde la edici\xF3n del dispositivo.</p></div></div></div></div><div class="flex justify-end" data-v-b8ed5c74${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105" data-v-b8ed5c74${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<span class="flex items-center" data-v-b8ed5c74${_scopeId}><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-b8ed5c74${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-b8ed5c74${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-b8ed5c74${_scopeId}></path></svg> Agregando... </span>`);
            } else {
              _push2(`<span class="flex items-center" data-v-b8ed5c74${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b8ed5c74${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-b8ed5c74${_scopeId}></path></svg> Add Device </span>`);
            }
            _push2(`</button></div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleSubmit, ["prevent"]),
                class: "space-y-6",
                "data-device-form": ""
              }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "deviceName",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " Device Name "),
                    withDirectives(createVNode("input", {
                      id: "deviceName",
                      "onUpdate:modelValue": ($event) => formData.deviceName = $event,
                      type: "text",
                      required: "",
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: Sensor Riego 01"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, formData.deviceName]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "enddeviceId",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " EnddeviceID "),
                    withDirectives(createVNode("input", {
                      id: "enddeviceId",
                      "onUpdate:modelValue": ($event) => formData.enddeviceId = $event,
                      type: "text",
                      required: "",
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                      placeholder: "Ej: my-device-01"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, formData.enddeviceId]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "appEui",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " AppEUI "),
                    withDirectives(createVNode("input", {
                      id: "appEui",
                      "onUpdate:modelValue": ($event) => formData.appEui = $event,
                      type: "text",
                      required: "",
                      pattern: "[A-Fa-f0-9]{16}",
                      maxlength: "16",
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono",
                      placeholder: "0123456789ABCDEF"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, formData.appEui]
                    ]),
                    createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "16 caracteres hexadecimales")
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "devEui",
                      class: "block text-sm font-medium text-white mb-2"
                    }, " DevEUI "),
                    withDirectives(createVNode("input", {
                      id: "devEui",
                      "onUpdate:modelValue": ($event) => formData.devEui = $event,
                      type: "text",
                      required: "",
                      pattern: "[A-Fa-f0-9]{16}",
                      maxlength: "16",
                      class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono",
                      placeholder: "FEDCBA9876543210"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, formData.devEui]
                    ]),
                    createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "16 caracteres hexadecimales")
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "appKey",
                    class: "block text-sm font-medium text-white mb-2"
                  }, " AppKey "),
                  withDirectives(createVNode("input", {
                    id: "appKey",
                    "onUpdate:modelValue": ($event) => formData.appKey = $event,
                    type: "text",
                    required: "",
                    pattern: "[A-Fa-f0-9]{32}",
                    maxlength: "32",
                    class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono",
                    placeholder: "0123456789ABCDEF0123456789ABCDEF"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, formData.appKey]
                  ]),
                  createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "32 caracteres hexadecimales")
                ]),
                createVNode("div", { class: "border-t border-gray-600 pt-6" }, [
                  createVNode("h3", { class: "text-lg font-medium text-white mb-4 flex items-center" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2 text-blue-400",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      })
                    ])),
                    createTextVNode(" Configuraci\xF3n TTN (The Things Network) ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "ttnRegion",
                        class: "block text-sm font-medium text-white mb-2"
                      }, " TTN Region "),
                      withDirectives(createVNode("select", {
                        id: "ttnRegion",
                        "onUpdate:modelValue": ($event) => formData.ttnRegion = $event,
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      }, [
                        createVNode("option", { value: "" }, "Seleccionar regi\xF3n"),
                        createVNode("option", { value: "eu1" }, "Europe 1 (eu1)"),
                        createVNode("option", { value: "nam1" }, "North America 1 (nam1)"),
                        createVNode("option", { value: "au1" }, "Australia 1 (au1)"),
                        createVNode("option", { value: "as1" }, "Asia 1 (as1)")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, formData.ttnRegion]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "Regi\xF3n del servidor TTN")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "ttnAppId",
                        class: "block text-sm font-medium text-white mb-2"
                      }, " TTN Application ID "),
                      withDirectives(createVNode("input", {
                        id: "ttnAppId",
                        "onUpdate:modelValue": ($event) => formData.ttnAppId = $event,
                        type: "text",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                        placeholder: "my-ttn-application"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, formData.ttnAppId]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "ID de la aplicaci\xF3n en TTN")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "ttnAccessKey",
                        class: "block text-sm font-medium text-white mb-2"
                      }, " TTN Access Key "),
                      withDirectives(createVNode("input", {
                        id: "ttnAccessKey",
                        "onUpdate:modelValue": ($event) => formData.ttnAccessKey = $event,
                        type: "password",
                        class: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono",
                        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, formData.ttnAccessKey]
                      ]),
                      createVNode("p", { class: "mt-1 text-xs text-gray-400" }, "Clave de acceso para la API TTN")
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg" }, [
                    createVNode("div", { class: "flex items-start" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("div", { class: "text-sm text-blue-300" }, [
                        createVNode("p", { class: "font-medium mb-1" }, "Configuraci\xF3n TTN (Opcional)"),
                        createVNode("p", null, "Los campos TTN son necesarios para el control remoto de la bomba de riego. Puedes configurarlos ahora o m\xE1s tarde desde la edici\xF3n del dispositivo.")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode("button", {
                    type: "submit",
                    disabled: isLoading.value,
                    class: "px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  }, [
                    isLoading.value ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "flex items-center"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                        fill: "none",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("circle", {
                          class: "opacity-25",
                          cx: "12",
                          cy: "12",
                          r: "10",
                          stroke: "currentColor",
                          "stroke-width": "4"
                        }),
                        createVNode("path", {
                          class: "opacity-75",
                          fill: "currentColor",
                          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        })
                      ])),
                      createTextVNode(" Agregando... ")
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "flex items-center"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5 mr-2",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Add Device ")
                    ]))
                  ], 8, ["disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Devices/DeviceForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const DeviceForm = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b8ed5c74"]]);
const _sfc_main$4 = {
  __name: "DatabaseStatusIcon",
  __ssrInlineRender: true,
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    showStatusDot: {
      type: Boolean,
      default: false
    },
    showStatusText: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center" }, _attrs))}><div class="${ssrRenderClass([
        "p-2 rounded-full transition-colors duration-200",
        __props.isActive ? "bg-green-100" : "bg-red-100"
      ])}"><svg class="${ssrRenderClass([__props.isActive ? "text-green-600" : "text-red-600", "w-5 h-5 transition-colors duration-200"])}" fill="currentColor" viewBox="0 0 20 20"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path></svg></div>`);
      if (__props.showStatusDot) {
        _push(`<div class="${ssrRenderClass([
          "w-3 h-3 rounded-full ml-2 transition-colors duration-200",
          __props.isActive ? "bg-green-500" : "bg-red-500"
        ])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showStatusText) {
        _push(`<span class="${ssrRenderClass([
          "ml-2 text-sm font-medium transition-colors duration-200",
          __props.isActive ? "text-green-600" : "text-red-600"
        ])}">${ssrInterpolate(__props.isActive ? "Activo" : "Inactivo")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Devices/DatabaseStatusIcon.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "DevicesFilter",
  __ssrInlineRender: true,
  props: {
    deviceStore: {
      type: Object,
      required: true
    }
  },
  emits: ["filter-change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const filters = ref({
      deviceName: "",
      enddeviceId: ""
    });
    const showDeviceNameSuggestions = ref(false);
    const showEndDeviceIdSuggestions = ref(false);
    const deviceNameSuggestions = ref([]);
    const endDeviceIdSuggestions = ref([]);
    const hasActiveFilters = computed(() => {
      return filters.value.deviceName.trim() !== "" || filters.value.enddeviceId.trim() !== "";
    });
    watch(filters, (newFilters) => {
      emit("filter-change", { ...newFilters });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-6" }, _attrs))}><h3 class="text-lg font-medium text-white mb-4">Filtrar Dispositivos</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="relative"><label class="block text-sm font-medium text-gray-300 mb-2"> Nombre del Dispositivo </label><div class="relative"><input${ssrRenderAttr("value", filters.value.deviceName)} type="text" placeholder="Buscar por nombre..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">`);
      if (showDeviceNameSuggestions.value && deviceNameSuggestions.value.length > 0) {
        _push(`<div class="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto"><!--[-->`);
        ssrRenderList(deviceNameSuggestions.value, (suggestion) => {
          _push(`<button class="w-full px-3 py-2 text-left text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">${ssrInterpolate(suggestion)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="relative"><label class="block text-sm font-medium text-gray-300 mb-2"> EndDevice ID </label><div class="relative"><input${ssrRenderAttr("value", filters.value.enddeviceId)} type="text" placeholder="Buscar por EndDevice ID..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">`);
      if (showEndDeviceIdSuggestions.value && endDeviceIdSuggestions.value.length > 0) {
        _push(`<div class="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto"><!--[-->`);
        ssrRenderList(endDeviceIdSuggestions.value, (suggestion) => {
          _push(`<button class="w-full px-3 py-2 text-left text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">${ssrInterpolate(suggestion)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="mt-4 flex justify-end"><button${ssrIncludeBooleanAttr(!hasActiveFilters.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"> Limpiar filtros </button></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Devices/DevicesFilter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "DevicesTable",
  __ssrInlineRender: true,
  props: {
    deviceStore: {
      type: Object,
      required: true
    }
  },
  emits: ["toggle-device", "edit-device", "delete-device"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { deviceActivated, deviceDeactivated, appKeyCopied, appKeyCopyError } = useToastNotifications();
    const visibleAppKeys = ref({});
    const copiedKeys = ref({});
    const visibleTtnKeys = ref({});
    const copiedTtnKeys = ref({});
    const currentFilters = ref({
      deviceName: "",
      enddeviceId: ""
    });
    const isDeleteModalOpen = ref(false);
    const deviceToDelete = ref(null);
    const filteredDevices = computed(() => {
      const filtered = props.deviceStore.filterDevices(currentFilters.value);
      console.log("\u{1F50D} Dispositivos filtrados en tabla:", filtered);
      return filtered;
    });
    const formatHex = (hex, isLong = false) => {
      if (!hex) return "";
      if (isLong && hex.length > 16) {
        return `${hex.substring(0, 8)}...`;
      }
      return hex.replace(/(.{4})/g, "$1 ").trim();
    };
    const handleFilterChange = (filters) => {
      currentFilters.value = { ...filters };
    };
    const handleToggleDevice = async (device, value) => {
      try {
        await props.deviceStore.toggleDeviceActive(device.id, value);
        if (value) {
          const otherActiveDevices = props.deviceStore.devices.filter(
            (d) => d.id !== device.id && d.is_active_communication
          );
          if (otherActiveDevices.length > 0) {
            deviceActivated(`${device.deviceName} activado. Los dem\xE1s dispositivos han sido desactivados autom\xE1ticamente.`);
          } else {
            deviceActivated(device.deviceName);
          }
        } else {
          deviceDeactivated(device.deviceName);
        }
        emit("toggle-device", { device, isActive: value });
      } catch (error) {
        console.error("Error al cambiar estado del dispositivo:", error);
      }
    };
    const handleEditDevice = (device) => {
      emit("edit-device", device);
    };
    const handleDeleteDevice = (device) => {
      deviceToDelete.value = device;
      isDeleteModalOpen.value = true;
    };
    const confirmDeleteDevice = () => {
      if (deviceToDelete.value) {
        emit("delete-device", deviceToDelete.value);
      }
      isDeleteModalOpen.value = false;
      deviceToDelete.value = null;
    };
    const cancelDeleteDevice = () => {
      isDeleteModalOpen.value = false;
      deviceToDelete.value = null;
    };
    const toggleAppKeyVisibility = (index) => {
      visibleAppKeys.value[index] = !visibleAppKeys.value[index];
    };
    const copyAppKey = async (appKey, index) => {
      try {
        await (void 0).clipboard.writeText(appKey);
        copiedKeys.value[index] = true;
        appKeyCopied();
        try {
          const DeviceAPI = (await import('./DeviceAPI-r0WuORwH.mjs')).default;
          await DeviceAPI.createApiKeyCopiedAlert();
        } catch (e) {
          console.warn("No se pudo crear la alerta de API key copiada:", e);
        }
        setTimeout(() => {
          copiedKeys.value[index] = false;
        }, 2e3);
      } catch (error) {
        console.error("Error al copiar AppKey:", error);
        const textArea = (void 0).createElement("textarea");
        textArea.value = appKey;
        (void 0).body.appendChild(textArea);
        textArea.select();
        try {
          copiedKeys.value[index] = true;
          appKeyCopied();
          try {
            const DeviceAPI = (await import('./DeviceAPI-r0WuORwH.mjs')).default;
            await DeviceAPI.createApiKeyCopiedAlert();
          } catch (e) {
            console.warn("No se pudo crear la alerta de API key copiada (fallback):", e);
          }
          setTimeout(() => {
            copiedKeys.value[index] = false;
          }, 2e3);
        } catch (fallbackError) {
          console.error("Error en fallback de copiado:", fallbackError);
          appKeyCopyError();
        }
        (void 0).body.removeChild(textArea);
      }
    };
    const toggleTtnKeyVisibility = (index) => {
      visibleTtnKeys.value[index] = !visibleTtnKeys.value[index];
    };
    const copyTtnKey = async (ttnAccessKey, index) => {
      try {
        await (void 0).clipboard.writeText(ttnAccessKey);
        copiedTtnKeys.value[index] = true;
        appKeyCopied();
        setTimeout(() => {
          copiedTtnKeys.value[index] = false;
        }, 2e3);
      } catch (error) {
        console.error("Error al copiar TTN Access Key:", error);
        const textArea = (void 0).createElement("textarea");
        textArea.value = ttnAccessKey;
        (void 0).body.appendChild(textArea);
        textArea.select();
        try {
          copiedTtnKeys.value[index] = true;
          appKeyCopied();
          setTimeout(() => {
            copiedTtnKeys.value[index] = false;
          }, 2e3);
        } catch (fallbackError) {
          console.error("Error en fallback de copiado:", fallbackError);
          appKeyCopyError();
        }
        (void 0).body.removeChild(textArea);
      }
    };
    const scrollToForm = () => {
      const formElement = (void 0).querySelector("[data-device-form]") || (void 0).querySelector(".device-form") || (void 0).querySelector("form");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else {
        (void 0).scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3b3bf415>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        "device-store": __props.deviceStore,
        onFilterChange: handleFilterChange
      }, null, _parent));
      _push(ssrRenderComponent(BaseCard, { title: "Dispositivos Registrados" }, {
        "header-actions": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-4" data-v-3b3bf415${_scopeId}><div class="flex items-center space-x-2" data-v-3b3bf415${_scopeId}><span class="text-sm text-gray-300 font-bold" data-v-3b3bf415${_scopeId}>Total: ${ssrInterpolate(__props.deviceStore.deviceCount)}</span></div><div class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded" data-v-3b3bf415${_scopeId}><svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20" data-v-3b3bf415${_scopeId}><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" data-v-3b3bf415${_scopeId}></path></svg> Activaci\xF3n autom\xE1tica: al activar un dispositivo se desactivan los dem\xE1s </div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-4" }, [
                createVNode("div", { class: "flex items-center space-x-2" }, [
                  createVNode("span", { class: "text-sm text-gray-300 font-bold" }, "Total: " + toDisplayString(__props.deviceStore.deviceCount), 1)
                ]),
                createVNode("div", { class: "text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-3 h-3 inline mr-1",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                      "clip-rule": "evenodd"
                    })
                  ])),
                  createTextVNode(" Activaci\xF3n autom\xE1tica: al activar un dispositivo se desactivan los dem\xE1s ")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (filteredDevices.value.length === 0) {
              _push2(`<div class="text-center py-12" data-v-3b3bf415${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" data-v-3b3bf415${_scopeId}></path></svg><h3 class="text-lg font-medium text-white mb-2" data-v-3b3bf415${_scopeId}>${ssrInterpolate(__props.deviceStore.deviceCount === 0 ? "No tienes dispositivos registrados" : "No se encontraron dispositivos")}</h3><p class="text-gray-400" data-v-3b3bf415${_scopeId}>${ssrInterpolate(__props.deviceStore.deviceCount === 0 ? "Registra tu primer dispositivo para comenzar a usar el sistema de riego" : "Intenta ajustar los filtros de b\xFAsqueda")}</p>`);
              if (__props.deviceStore.deviceCount === 0) {
                _push2(`<div class="mt-6" data-v-3b3bf415${_scopeId}><button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900" data-v-3b3bf415${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-3b3bf415${_scopeId}></path></svg> Registrar Primer Dispositivo </button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="overflow-x-auto" data-v-3b3bf415${_scopeId}><table class="w-full text-sm text-left min-w-[1200px]" data-v-3b3bf415${_scopeId}><thead class="text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600" data-v-3b3bf415${_scopeId}><tr data-v-3b3bf415${_scopeId}><th scope="col" class="px-4 py-4 font-medium text-center w-48" data-v-3b3bf415${_scopeId}>Device Name</th><th scope="col" class="px-4 py-4 font-medium text-center w-40" data-v-3b3bf415${_scopeId}>EnddeviceID</th><th scope="col" class="px-4 py-4 font-medium text-center w-32" data-v-3b3bf415${_scopeId}>AppEUI</th><th scope="col" class="px-4 py-4 font-medium text-center w-32" data-v-3b3bf415${_scopeId}>DevEUI</th><th scope="col" class="px-4 py-4 font-medium text-center w-48" data-v-3b3bf415${_scopeId}>AppKey</th><th scope="col" class="px-4 py-4 font-medium text-center w-24" data-v-3b3bf415${_scopeId}>TTN Region</th><th scope="col" class="px-4 py-4 font-medium text-center w-32" data-v-3b3bf415${_scopeId}>TTN App ID</th><th scope="col" class="px-4 py-4 font-medium text-center w-48" data-v-3b3bf415${_scopeId}>TTN Access Key</th><th scope="col" class="px-4 py-4 font-medium text-center w-32" data-v-3b3bf415${_scopeId}>Estado</th><th scope="col" class="px-4 py-4 font-medium text-center w-32" data-v-3b3bf415${_scopeId}>Acciones</th></tr></thead><tbody class="divide-y divide-gray-600" data-v-3b3bf415${_scopeId}><!--[-->`);
              ssrRenderList(filteredDevices.value, (device, index) => {
                _push2(`<tr class="hover:bg-gray-800/30 transition-colors duration-150" data-v-3b3bf415${_scopeId}><td class="px-4 py-4 font-medium text-white text-center" data-v-3b3bf415${_scopeId}><div class="flex items-center justify-center" data-v-3b3bf415${_scopeId}><div class="${ssrRenderClass([device.isActive ? "bg-green-500" : "bg-gray-500", "flex-shrink-0 w-3 h-3 rounded-full mr-3"])}" data-v-3b3bf415${_scopeId}></div> ${ssrInterpolate(device.deviceName)}</div></td><td class="px-4 py-4 text-gray-300 font-mono text-sm text-center" data-v-3b3bf415${_scopeId}>${ssrInterpolate(device.enddeviceId)}</td><td class="px-4 py-4 text-gray-300 font-mono text-sm text-center" data-v-3b3bf415${_scopeId}><span class="bg-gray-700 px-2 py-1 rounded text-xs" data-v-3b3bf415${_scopeId}>${ssrInterpolate(formatHex(device.appEui))}</span></td><td class="px-4 py-4 text-gray-300 font-mono text-sm text-center" data-v-3b3bf415${_scopeId}><span class="bg-gray-700 px-2 py-1 rounded text-xs" data-v-3b3bf415${_scopeId}>${ssrInterpolate(formatHex(device.devEui))}</span></td><td class="px-4 py-4 text-gray-300 font-mono text-sm text-center" data-v-3b3bf415${_scopeId}><div class="flex items-center justify-center space-x-2" data-v-3b3bf415${_scopeId}><div class="relative bg-gray-700 rounded text-xs overflow-hidden" style="${ssrRenderStyle({ "width": "120px" })}" data-v-3b3bf415${_scopeId}><input${ssrRenderAttr("type", visibleAppKeys.value[index] ? "text" : "password")}${ssrRenderAttr("value", device.appKey)} readonly class="w-full px-2 py-1 bg-transparent text-gray-300 text-xs font-mono border-none outline-none cursor-text"${ssrRenderAttr("placeholder", visibleAppKeys.value[index] ? "" : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")} style="${ssrRenderStyle({ "padding-right": "20px" })}" data-v-3b3bf415${_scopeId}></div><div class="flex items-center space-x-1" data-v-3b3bf415${_scopeId}><button class="p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"${ssrRenderAttr("title", visibleAppKeys.value[index] ? "Ocultar AppKey" : "Mostrar AppKey")} data-v-3b3bf415${_scopeId}>`);
                if (visibleAppKeys.value[index]) {
                  _push2(`<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-3b3bf415${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-3b3bf415${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-3b3bf415${_scopeId}></path></svg>`);
                }
                _push2(`</button><button${ssrRenderAttr("title", `Copiar AppKey${copiedKeys.value[index] ? " - \xA1Copiado!" : ""}`)} class="${ssrRenderClass([{ "text-green-500": copiedKeys.value[index], "text-gray-400": !copiedKeys.value[index] }, "p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"])}" data-v-3b3bf415${_scopeId}>`);
                if (copiedKeys.value[index]) {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-3b3bf415${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" data-v-3b3bf415${_scopeId}></path></svg>`);
                }
                _push2(`</button></div></div></td><td class="px-4 py-4 text-gray-300 text-sm text-center" data-v-3b3bf415${_scopeId}>`);
                if (device.ttnRegion) {
                  _push2(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/30" data-v-3b3bf415${_scopeId}>${ssrInterpolate(device.ttnRegion)}</span>`);
                } else {
                  _push2(`<span class="text-gray-500 italic" data-v-3b3bf415${_scopeId}>No configurado</span>`);
                }
                _push2(`</td><td class="px-4 py-4 text-gray-300 font-mono text-sm text-center" data-v-3b3bf415${_scopeId}>`);
                if (device.ttnAppId) {
                  _push2(`<div class="max-w-32 truncate" data-v-3b3bf415${_scopeId}>${ssrInterpolate(device.ttnAppId)}</div>`);
                } else {
                  _push2(`<span class="text-gray-500 italic" data-v-3b3bf415${_scopeId}>No configurado</span>`);
                }
                _push2(`</td><td class="px-4 py-4 text-gray-300 font-mono text-sm text-center" data-v-3b3bf415${_scopeId}>`);
                if (device.ttnAccessKey) {
                  _push2(`<div class="flex items-center justify-center space-x-2" data-v-3b3bf415${_scopeId}><div class="relative bg-gray-700 rounded text-xs overflow-hidden" style="${ssrRenderStyle({ "width": "120px" })}" data-v-3b3bf415${_scopeId}><input${ssrRenderAttr("type", visibleTtnKeys.value[index] ? "text" : "password")}${ssrRenderAttr("value", device.ttnAccessKey)} readonly class="w-full px-2 py-1 bg-transparent text-gray-300 text-xs font-mono border-none outline-none cursor-text"${ssrRenderAttr("placeholder", visibleTtnKeys.value[index] ? "" : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")} style="${ssrRenderStyle({ "padding-right": "20px" })}" data-v-3b3bf415${_scopeId}></div><div class="flex items-center space-x-1" data-v-3b3bf415${_scopeId}><button class="p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"${ssrRenderAttr("title", visibleTtnKeys.value[index] ? "Ocultar TTN Access Key" : "Mostrar TTN Access Key")} data-v-3b3bf415${_scopeId}>`);
                  if (visibleTtnKeys.value[index]) {
                    _push2(`<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-3b3bf415${_scopeId}></path></svg>`);
                  } else {
                    _push2(`<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-3b3bf415${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-3b3bf415${_scopeId}></path></svg>`);
                  }
                  _push2(`</button><button${ssrRenderAttr("title", `Copiar TTN Access Key${copiedTtnKeys.value[index] ? " - \xA1Copiado!" : ""}`)} class="${ssrRenderClass([{ "text-green-500": copiedTtnKeys.value[index], "text-gray-400": !copiedTtnKeys.value[index] }, "p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"])}" data-v-3b3bf415${_scopeId}>`);
                  if (copiedTtnKeys.value[index]) {
                    _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-3b3bf415${_scopeId}></path></svg>`);
                  } else {
                    _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" data-v-3b3bf415${_scopeId}></path></svg>`);
                  }
                  _push2(`</button></div></div>`);
                } else {
                  _push2(`<span class="text-gray-500 italic" data-v-3b3bf415${_scopeId}>No configurado</span>`);
                }
                _push2(`</td><td class="px-4 py-4" data-v-3b3bf415${_scopeId}><div class="flex items-center justify-center space-x-3" data-v-3b3bf415${_scopeId}>`);
                _push2(ssrRenderComponent(CustomSwitch, {
                  modelValue: device.isActive,
                  "onUpdate:modelValue": ($event) => device.isActive = $event,
                  label: `Toggle device ${device.deviceName}`,
                  onChange: (value) => handleToggleDevice(device, value)
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$4, {
                  "is-active": device.isActive,
                  "show-status-dot": false
                }, null, _parent2, _scopeId));
                _push2(`</div></td><td class="px-4 py-4" data-v-3b3bf415${_scopeId}><div class="flex items-center justify-center space-x-4" data-v-3b3bf415${_scopeId}><div class="flex flex-col items-center space-y-1" data-v-3b3bf415${_scopeId}><button class="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"${ssrRenderAttr("title", `Editar ${device.deviceName}`)} aria-label="Editar dispositivo" data-v-3b3bf415${_scopeId}>`);
                _push2(ssrRenderComponent(EditIcon, { class: "w-5 h-5" }, null, _parent2, _scopeId));
                _push2(`</button><span class="text-xs text-gray-400" data-v-3b3bf415${_scopeId}>Editar</span></div><div class="flex flex-col items-center space-y-1" data-v-3b3bf415${_scopeId}><button class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"${ssrRenderAttr("title", `Eliminar ${device.deviceName}`)} aria-label="Eliminar dispositivo" data-v-3b3bf415${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3b3bf415${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-3b3bf415${_scopeId}></path></svg></button><span class="text-xs text-gray-400" data-v-3b3bf415${_scopeId}>Borrar</span></div></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
          } else {
            return [
              filteredDevices.value.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-12"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "mx-auto h-12 w-12 text-gray-500 mb-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  })
                ])),
                createVNode("h3", { class: "text-lg font-medium text-white mb-2" }, toDisplayString(__props.deviceStore.deviceCount === 0 ? "No tienes dispositivos registrados" : "No se encontraron dispositivos"), 1),
                createVNode("p", { class: "text-gray-400" }, toDisplayString(__props.deviceStore.deviceCount === 0 ? "Registra tu primer dispositivo para comenzar a usar el sistema de riego" : "Intenta ajustar los filtros de b\xFAsqueda"), 1),
                __props.deviceStore.deviceCount === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6"
                }, [
                  createVNode("button", {
                    onClick: scrollToForm,
                    class: "inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                      })
                    ])),
                    createTextVNode(" Registrar Primer Dispositivo ")
                  ])
                ])) : createCommentVNode("", true)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "overflow-x-auto"
              }, [
                createVNode("table", { class: "w-full text-sm text-left min-w-[1200px]" }, [
                  createVNode("thead", { class: "text-xs text-gray-300 uppercase bg-gray-800/50 border-b border-gray-600" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-48"
                      }, "Device Name"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-40"
                      }, "EnddeviceID"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-32"
                      }, "AppEUI"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-32"
                      }, "DevEUI"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-48"
                      }, "AppKey"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-24"
                      }, "TTN Region"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-32"
                      }, "TTN App ID"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-48"
                      }, "TTN Access Key"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-32"
                      }, "Estado"),
                      createVNode("th", {
                        scope: "col",
                        class: "px-4 py-4 font-medium text-center w-32"
                      }, "Acciones")
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-600" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredDevices.value, (device, index) => {
                      return openBlock(), createBlock("tr", {
                        key: device.id || index,
                        class: "hover:bg-gray-800/30 transition-colors duration-150"
                      }, [
                        createVNode("td", { class: "px-4 py-4 font-medium text-white text-center" }, [
                          createVNode("div", { class: "flex items-center justify-center" }, [
                            createVNode("div", {
                              class: ["flex-shrink-0 w-3 h-3 rounded-full mr-3", device.isActive ? "bg-green-500" : "bg-gray-500"]
                            }, null, 2),
                            createTextVNode(" " + toDisplayString(device.deviceName), 1)
                          ])
                        ]),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 font-mono text-sm text-center" }, toDisplayString(device.enddeviceId), 1),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 font-mono text-sm text-center" }, [
                          createVNode("span", { class: "bg-gray-700 px-2 py-1 rounded text-xs" }, toDisplayString(formatHex(device.appEui)), 1)
                        ]),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 font-mono text-sm text-center" }, [
                          createVNode("span", { class: "bg-gray-700 px-2 py-1 rounded text-xs" }, toDisplayString(formatHex(device.devEui)), 1)
                        ]),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 font-mono text-sm text-center" }, [
                          createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                            createVNode("div", {
                              class: "relative bg-gray-700 rounded text-xs overflow-hidden",
                              style: { "width": "120px" }
                            }, [
                              createVNode("input", {
                                type: visibleAppKeys.value[index] ? "text" : "password",
                                value: device.appKey,
                                readonly: "",
                                class: "w-full px-2 py-1 bg-transparent text-gray-300 text-xs font-mono border-none outline-none cursor-text",
                                placeholder: visibleAppKeys.value[index] ? "" : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                                style: { "padding-right": "20px" }
                              }, null, 8, ["type", "value", "placeholder"])
                            ]),
                            createVNode("div", { class: "flex items-center space-x-1" }, [
                              createVNode("button", {
                                onClick: ($event) => toggleAppKeyVisibility(index),
                                class: "p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                                title: visibleAppKeys.value[index] ? "Ocultar AppKey" : "Mostrar AppKey"
                              }, [
                                visibleAppKeys.value[index] ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  class: "w-4 h-4 text-gray-400",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  class: "w-4 h-4 text-gray-400",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ]))
                              ], 8, ["onClick", "title"]),
                              createVNode("button", {
                                onClick: ($event) => copyAppKey(device.appKey, index),
                                class: ["p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500", { "text-green-500": copiedKeys.value[index], "text-gray-400": !copiedKeys.value[index] }],
                                title: `Copiar AppKey${copiedKeys.value[index] ? " - \xA1Copiado!" : ""}`
                              }, [
                                copiedKeys.value[index] ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  })
                                ]))
                              ], 10, ["onClick", "title"])
                            ])
                          ])
                        ]),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 text-sm text-center" }, [
                          device.ttnRegion ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/30"
                          }, toDisplayString(device.ttnRegion), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-gray-500 italic"
                          }, "No configurado"))
                        ]),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 font-mono text-sm text-center" }, [
                          device.ttnAppId ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "max-w-32 truncate"
                          }, toDisplayString(device.ttnAppId), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-gray-500 italic"
                          }, "No configurado"))
                        ]),
                        createVNode("td", { class: "px-4 py-4 text-gray-300 font-mono text-sm text-center" }, [
                          device.ttnAccessKey ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center justify-center space-x-2"
                          }, [
                            createVNode("div", {
                              class: "relative bg-gray-700 rounded text-xs overflow-hidden",
                              style: { "width": "120px" }
                            }, [
                              createVNode("input", {
                                type: visibleTtnKeys.value[index] ? "text" : "password",
                                value: device.ttnAccessKey,
                                readonly: "",
                                class: "w-full px-2 py-1 bg-transparent text-gray-300 text-xs font-mono border-none outline-none cursor-text",
                                placeholder: visibleTtnKeys.value[index] ? "" : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                                style: { "padding-right": "20px" }
                              }, null, 8, ["type", "value", "placeholder"])
                            ]),
                            createVNode("div", { class: "flex items-center space-x-1" }, [
                              createVNode("button", {
                                onClick: ($event) => toggleTtnKeyVisibility(index),
                                class: "p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                                title: visibleTtnKeys.value[index] ? "Ocultar TTN Access Key" : "Mostrar TTN Access Key"
                              }, [
                                visibleTtnKeys.value[index] ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  class: "w-4 h-4 text-gray-400",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  class: "w-4 h-4 text-gray-400",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ]))
                              ], 8, ["onClick", "title"]),
                              createVNode("button", {
                                onClick: ($event) => copyTtnKey(device.ttnAccessKey, index),
                                class: ["p-1 rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500", { "text-green-500": copiedTtnKeys.value[index], "text-gray-400": !copiedTtnKeys.value[index] }],
                                title: `Copiar TTN Access Key${copiedTtnKeys.value[index] ? " - \xA1Copiado!" : ""}`
                              }, [
                                copiedTtnKeys.value[index] ? (openBlock(), createBlock("svg", {
                                  key: 0,
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ])) : (openBlock(), createBlock("svg", {
                                  key: 1,
                                  class: "w-4 h-4",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  })
                                ]))
                              ], 10, ["onClick", "title"])
                            ])
                          ])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-gray-500 italic"
                          }, "No configurado"))
                        ]),
                        createVNode("td", { class: "px-4 py-4" }, [
                          createVNode("div", { class: "flex items-center justify-center space-x-3" }, [
                            createVNode(CustomSwitch, {
                              modelValue: device.isActive,
                              "onUpdate:modelValue": ($event) => device.isActive = $event,
                              label: `Toggle device ${device.deviceName}`,
                              onChange: (value) => handleToggleDevice(device, value)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "onChange"]),
                            createVNode(_sfc_main$4, {
                              "is-active": device.isActive,
                              "show-status-dot": false
                            }, null, 8, ["is-active"])
                          ])
                        ]),
                        createVNode("td", { class: "px-4 py-4" }, [
                          createVNode("div", { class: "flex items-center justify-center space-x-4" }, [
                            createVNode("div", { class: "flex flex-col items-center space-y-1" }, [
                              createVNode("button", {
                                onClick: ($event) => handleEditDevice(device),
                                class: "p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                title: `Editar ${device.deviceName}`,
                                "aria-label": "Editar dispositivo"
                              }, [
                                createVNode(EditIcon, { class: "w-5 h-5" })
                              ], 8, ["onClick", "title"]),
                              createVNode("span", { class: "text-xs text-gray-400" }, "Editar")
                            ]),
                            createVNode("div", { class: "flex flex-col items-center space-y-1" }, [
                              createVNode("button", {
                                onClick: ($event) => handleDeleteDevice(device),
                                class: "p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500",
                                title: `Eliminar ${device.deviceName}`,
                                "aria-label": "Eliminar dispositivo"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ]))
                              ], 8, ["onClick", "title"]),
                              createVNode("span", { class: "text-xs text-gray-400" }, "Borrar")
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        "is-open": isDeleteModalOpen.value,
        title: "Eliminar Dispositivo",
        message: "\xBFEst\xE1s seguro de que quieres eliminar este dispositivo? Esta acci\xF3n eliminar\xE1 permanentemente el dispositivo y todos sus datos asociados.",
        "item-name": (_a = deviceToDelete.value) == null ? void 0 : _a.deviceName,
        "item-type": "dispositivo",
        onConfirm: confirmDeleteDevice,
        onCancel: cancelDeleteDevice
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Devices/DevicesTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DevicesTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3b3bf415"]]);
const _sfc_main$1 = {
  __name: "DeviceEditModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    device: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isLoading = ref(false);
    const formData = reactive({
      deviceName: "",
      enddeviceId: "",
      appEui: "",
      devEui: "",
      appKey: "",
      ttnRegion: "",
      ttnAppId: "",
      ttnAccessKey: ""
    });
    watch(() => props.device, (newDevice) => {
      if (newDevice) {
        formData.deviceName = newDevice.deviceName || "";
        formData.enddeviceId = newDevice.enddeviceId || "";
        formData.appEui = newDevice.appEui || "";
        formData.devEui = newDevice.devEui || "";
        formData.appKey = newDevice.appKey || "";
        formData.ttnRegion = newDevice.ttnRegion || "";
        formData.ttnAppId = newDevice.ttnAppId || "";
        formData.ttnAccessKey = newDevice.ttnAccessKey || "";
      }
    }, { immediate: true });
    const closeModal = () => {
      emit("close");
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && props.isOpen) {
        closeModal();
      }
    };
    watch(() => props.isOpen, (isOpen) => {
      if (isOpen) {
        (void 0).addEventListener("keydown", handleKeyDown);
        (void 0).body.style.overflow = "hidden";
      } else {
        (void 0).removeEventListener("keydown", handleKeyDown);
        (void 0).body.style.overflow = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" }, _attrs))}><div class="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"><div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold text-white">Editar Dispositivo</h2><button class="text-gray-400 hover:text-white transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="edit-deviceName" class="block text-sm font-medium text-white mb-2"> Device Name * </label><input id="edit-deviceName"${ssrRenderAttr("value", formData.deviceName)} type="text" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Ej: Sensor Riego 01"></div><div><label for="edit-enddeviceId" class="block text-sm font-medium text-white mb-2"> EnddeviceID * </label><input id="edit-enddeviceId"${ssrRenderAttr("value", formData.enddeviceId)} type="text" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Ej: my-device-01"></div><div><label for="edit-appEui" class="block text-sm font-medium text-white mb-2"> AppEUI * </label><input id="edit-appEui"${ssrRenderAttr("value", formData.appEui)} type="text" required pattern="[A-Fa-f0-9]{16}" maxlength="16" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="0123456789ABCDEF"><p class="mt-1 text-xs text-gray-400">16 caracteres hexadecimales</p></div><div><label for="edit-devEui" class="block text-sm font-medium text-white mb-2"> DevEUI * </label><input id="edit-devEui"${ssrRenderAttr("value", formData.devEui)} type="text" required pattern="[A-Fa-f0-9]{16}" maxlength="16" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="FEDCBA9876543210"><p class="mt-1 text-xs text-gray-400">16 caracteres hexadecimales</p></div></div><div><label for="edit-appKey" class="block text-sm font-medium text-white mb-2"> AppKey * </label><input id="edit-appKey"${ssrRenderAttr("value", formData.appKey)} type="text" required pattern="[A-Fa-f0-9]{32}" maxlength="32" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="0123456789ABCDEF0123456789ABCDEF"><p class="mt-1 text-xs text-gray-400">32 caracteres hexadecimales</p></div><div class="border-t border-gray-600 pt-6"><h3 class="text-lg font-medium text-white mb-4 flex items-center"><svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg> Configuraci\xF3n TTN (The Things Network) </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label for="edit-ttnRegion" class="block text-sm font-medium text-white mb-2"> TTN Region </label><select id="edit-ttnRegion" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"><option value=""${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "") : ssrLooseEqual(formData.ttnRegion, "")) ? " selected" : ""}>Seleccionar regi\xF3n</option><option value="eu1"${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "eu1") : ssrLooseEqual(formData.ttnRegion, "eu1")) ? " selected" : ""}>Europe 1 (eu1)</option><option value="nam1"${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "nam1") : ssrLooseEqual(formData.ttnRegion, "nam1")) ? " selected" : ""}>North America 1 (nam1)</option><option value="au1"${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "au1") : ssrLooseEqual(formData.ttnRegion, "au1")) ? " selected" : ""}>Australia 1 (au1)</option><option value="as1"${ssrIncludeBooleanAttr(Array.isArray(formData.ttnRegion) ? ssrLooseContain(formData.ttnRegion, "as1") : ssrLooseEqual(formData.ttnRegion, "as1")) ? " selected" : ""}>Asia 1 (as1)</option></select><p class="mt-1 text-xs text-gray-400">Regi\xF3n del servidor TTN</p></div><div><label for="edit-ttnAppId" class="block text-sm font-medium text-white mb-2"> TTN Application ID </label><input id="edit-ttnAppId"${ssrRenderAttr("value", formData.ttnAppId)} type="text" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="my-ttn-application"><p class="mt-1 text-xs text-gray-400">ID de la aplicaci\xF3n en TTN</p></div><div><label for="edit-ttnAccessKey" class="block text-sm font-medium text-white mb-2"> TTN Access Key </label><input id="edit-ttnAccessKey"${ssrRenderAttr("value", formData.ttnAccessKey)} type="password" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"><p class="mt-1 text-xs text-gray-400">Clave de acceso para la API TTN</p></div></div><div class="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg"><div class="flex items-start"><svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="text-sm text-blue-300"><p class="font-medium mb-1">Configuraci\xF3n TTN (Opcional)</p><p>Los campos TTN son necesarios para el control remoto de la bomba de riego. Puedes configurarlos ahora o m\xE1s tarde.</p></div></div></div></div><div class="flex justify-end space-x-4 pt-6 border-t border-gray-600"><button type="button" class="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center">`);
        if (isLoading.value) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Guardando... </span>`);
        } else {
          _push(`<span class="flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Guardar Cambios </span>`);
        }
        _push(`</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Devices/DeviceEditModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "dispositivos",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const deviceStore = useDeviceStore();
    const { toast } = useToastNotifications();
    const isEditModalOpen = ref(false);
    const deviceToEdit = ref(null);
    const handleDeviceAdded = async (newDeviceData) => {
      var _a;
      try {
        const deviceToAdd = {
          device_name: newDeviceData.deviceName,
          enddevice_id: newDeviceData.enddeviceId,
          app_eui: newDeviceData.appEui,
          dev_eui: newDeviceData.devEui,
          app_key: newDeviceData.appKey,
          is_active_communication: false,
          // Estado inicial inactivo
          ttn_region: newDeviceData.ttnRegion || null,
          ttn_app_id: newDeviceData.ttnAppId || null,
          ttn_access_key: newDeviceData.ttnAccessKey || null
        };
        console.log("\u{1F4DD} Datos a enviar:", deviceToAdd);
        const response = await deviceStore.createDevice(deviceToAdd);
        console.log("\u2705 Dispositivo creado exitosamente:", (_a = response.data) == null ? void 0 : _a.device_name);
        toast.success("Dispositivo registrado exitosamente");
      } catch (error) {
        console.error("\u274C Error creando dispositivo:", error);
        toast.error(error.message || "Error al registrar dispositivo");
      }
    };
    const handleToggleDevice = async ({ device, isActive }) => {
      console.log(`Evento de toggle recibido para ${device.deviceName}: ${isActive ? "activado" : "desactivado"}`);
    };
    const handleEditDevice = (device) => {
      console.log("\u{1F527} Editar dispositivo:", device.deviceName);
      deviceToEdit.value = device;
      isEditModalOpen.value = true;
    };
    const handleCloseEditModal = () => {
      isEditModalOpen.value = false;
      deviceToEdit.value = null;
    };
    const handleSaveDevice = async ({ deviceId, updateData }) => {
      try {
        await deviceStore.updateDevice(deviceId, updateData);
        console.log("\u2705 Dispositivo actualizado exitosamente");
        toast.success("Dispositivo actualizado exitosamente");
      } catch (error) {
        console.error("\u274C Error actualizando dispositivo:", error);
        toast.error(error.message || "Error al actualizar dispositivo");
      }
    };
    const handleDeleteDevice = async (device) => {
      try {
        await deviceStore.deleteDevice(device.id);
        console.log("\u2705 Dispositivo eliminado exitosamente");
        toast.success("Dispositivo eliminado exitosamente");
      } catch (error) {
        console.error("\u274C Error eliminando dispositivo:", error);
        toast.error(error.message || "Error al eliminar dispositivo");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-white">Dispositivos IoT</h1><p class="text-gray-400 mt-2">Gesti\xF3n y monitoreo de dispositivos para el sistema de riego autom\xE1tico</p></div>`);
      _push(ssrRenderComponent(DeviceForm, { onDeviceAdded: handleDeviceAdded }, null, _parent));
      _push(ssrRenderComponent(DevicesTable, {
        "device-store": unref(deviceStore),
        onToggleDevice: handleToggleDevice,
        onEditDevice: handleEditDevice,
        onDeleteDevice: handleDeleteDevice
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        "is-open": isEditModalOpen.value,
        device: deviceToEdit.value,
        onClose: handleCloseEditModal,
        onSave: handleSaveDevice
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dispositivos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dispositivos-CXS5uHmh.mjs.map
