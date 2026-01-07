import { error } from "console";

export const userAllowedProps = {
  profile: {
    allowed: ["name"],
    error: "Invalid profile update",
    isValid({ data }: { data: string[] }) {
      return data.every((prop) => this.allowed.includes(prop));
    },
  },
  create: {
    allowed: ["name", "email", "password"],
    error: "Invalid data for signup",
    isValid({ data }: { data: string[] }) {
      return data.every((prop) => this.allowed.includes(prop));
    },
  },
};

export const groupAllowedProps = {
  create: {
    allowed: ["name", "type"],
    error: "Invalid data for group",
    isValid({ data }: { data: string[] }) {
      return data.every((prop) => this.allowed.includes(prop));
    },
  },
};

export const questionAllowedProps = {
  create: {
    allowed: ["question", "dateTime", "groupId"],
    error: "Invalid data for questions",
    isValid({ data }: { data: Record<string, string> }) {
      return Object.keys(data)?.every((prop) => this.allowed.includes(prop));
    },
  },
  update: {
    allowed: ["question", "dateTime"],
    error: "Invalid data for questions",
    isValid({ data }: { data: Record<string, string> }) {
      return Object.keys(data)?.every((prop) => this.allowed.includes(prop));
    },
  },
};

export const answersAllowedProps = {
  create: {
    allowed: ["answer", "dateTime", "groupId"],
    error: "Invalid data for answer",
    isValid({ data }: { data: Record<string, string> }) {
      return Object.keys(data)?.every((prop) => this.allowed.includes(prop));
    },
  },
  update: {
    allowed: ["answer", "dateTime"],
    error: "Invalid data for answers",
    isValid({ data }: { data: Record<string, string> }) {
      return Object.keys(data)?.every((prop) => this.allowed.includes(prop));
    },
  },
};

export const packageAllowedProps = {
  create: {
    allowed: [
      "name",
      "numberOfPerson",
      "title",
      "price",
      "description",
      "isPopular",
    ],
    error: "Invalid data for package creation",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },

  update: {
    allowed: [
      "name",
      "numberOfPerson",
      "title",
      "price",
      "description",
      "isPopular",
    ],
    error: "Invalid data for package update",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },
};

export const eventAllowedProps = {
  create: {
    allowed: [
      "eventName",
      "eventStartTime",
      "eventExpirationTime",
      "templeId",
      "packageId",
      "pricePackageId",
      "isPopular",
    ],
    error: "Invalid data for event creation",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },

  update: {
    allowed: [
      "eventName",
      "eventStartTime",
      "eventExpirationTime",
      "templeId",
      "packageId",
      "pricePackageId",
      "isPopular",
    ],
    error: "Invalid data for event update",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },
};

export const panditAllowedProps = {
  create: {
    allowed: [
      "name",
      "about",
      "address",
      "email",
      "phone",
      "extraInfo",
      "specialization",
      "templeAssociatedId",
    ],
    error: "Invalid data for pandit creation",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },

  update: {
    allowed: [
      "name",
      "about",
      "address",
      "email",
      "phone",
      "extraInfo",
      "specialization",
      "templeAssociatedId",
    ],
    error: "Invalid data for pandit update",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },
};

export const coreEventAllowedProps = {
  create: {
    allowed: ["name", "description", "status", "iconUrl"],
    error: "Invalid data for core event creation",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },

  update: {
    allowed: ["name", "description", "status", "iconUrl"],
    error: "Invalid data for core event update",
    isValid({ data }: { data: Record<string, any> }) {
      return Object.keys(data).every((prop) => this.allowed.includes(prop));
    },
  },
};
