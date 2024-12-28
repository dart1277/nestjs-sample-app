import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

export type Msg = { id: string; content: string };

async function getMessages(): Promise<Record<string, Msg>> {
  const content = await readFile('data_msg.json', 'utf8');
  return JSON.parse(content);
}

async function writeMessages(messages: Msg[]): Promise<void> {
  const data = {};
  messages.forEach((msg: Msg) => {
    data[msg.id] = msg;
  });
  await writeFile('data_msg.json', JSON.stringify(data), {
    encoding: 'utf8',
    flag: 'w',
    flush: true,
  });
}

export interface IMessagesRepository {
  findOne(id: string): Promise<Msg | undefined>;

  findAll(): Promise<Msg[]>;

  create(id: string, message: string): Promise<Msg>;
}

export const IMessagesRepository = Symbol('IMessagesRepository');

//@Injectable()
export class MessagesRepository implements IMessagesRepository {
  async findOne(id: string): Promise<Msg | undefined> {
    const messages = await getMessages();
    return messages[id];
  }

  async findAll(): Promise<Msg[]> {
    const messageMap = await getMessages();
    return Object.entries(messageMap).map<Msg>(([_, value]) => value);
  }

  async create(id: string, message: string): Promise<Msg> {
    const messages = await this.findAll();
    const msg = { id, content: message };
    messages.push(msg);
    await writeMessages(messages);
    return msg;
  }
}
