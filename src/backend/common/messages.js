/**
 * Created by wywanghuanhuan on 2016/11/29.
 */
import React, {Component} from 'react';
import {messages} from 'async-validator';
console.log('messages',messages)
messages.default = '字段错误';
messages.required = '这是必填字段';
messages.enum = ' 必须是%s中的一个';
messages.whitespace = '不能为空';
messages.date =  {
    format: ' 日期格式无效',
    parse: ' 日期无法解析, 是无效的 ',
    invalid: '日期是无效的',
};
messages.types = {
    string: ' 不是 ',
    method: ' 不是一个 (function)',
    array: ' 不是一个 ',
    object: ' 不是一个 ',
    number: ' 不是一个 ',
    date: ' 不是一个 ',
    boolean: ' 不是一个 ',
    integer: ' 不是一个 ',
    float: ' 不是一个 ',
    regexp: ' 不是一个正确 ',
    email: ' 不是一个正确 ',
    url: ' 不是一个正确 ',
    hex: ' 不是一个正确 ',
};
messages.string = {
    len: ' 长度必须等于 ',
    min: ' 不能小于 ',
    max: ' 不能大于  ',
    range: ' 必须在 %s 和 %s 个字符之间',
};

messages.number = {
    len: '必须等于',
    min: ' 不能小于 ',
    max: ' 不能大于 ',
    range: '必须在 %s 和 %s 之间',
};

messages.array = {
    len: '长度必须等于',
    min: '长度不能小于',
    max: '度不能大于',
    range: '长度必须在 %s 和 %s 之间',
};

messages.pattern = {
    mismatch: '%s不匹配规则 %s',
};

messages.clone()