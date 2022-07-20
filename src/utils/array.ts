import { Ref, unref } from "vue";

export function arrayItemToBottom(rawArr: Ref<any[]> | any[], key: string, value: any) {
  const arr = unref(rawArr);
  const index = arr.findIndex(item => item[key] === value);
  if (index === -1) {
    return;
  }
  const item = arr[index];
  arr.splice(index, 1);
  arr.push(item);
}