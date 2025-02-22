#ifndef EUPHONIUM_EVENTBUS_H
#define EUPHONIUM_EVENTBUS_H

#include <memory>
#include <functional>
#include <queue>
#include <any>
#include <unordered_map>
#include <set>
#include <WrappedSemaphore.h>
#include <BerryBind.h>

enum class EventType : uint32_t {
    LUA_MAIN_EVENT,
    BERRY_ERROR_EVENT
};

class Event {
    public:
    Event() {};
    virtual ~Event() {};
    EventType eventType;
    std::string subType;
    virtual berry::map toBerry() = 0;
};

class EventSubscriber {
public:
    virtual void handleEvent(std::unique_ptr<Event> &event) = 0;
};

class EventBus {
private:
    std::queue<std::unique_ptr<Event>> eventQueue;
    std::unordered_map<EventType, std::vector<std::reference_wrapper<EventSubscriber>>> registeredListeners;
public:
    EventBus();
    std::unique_ptr<WrappedSemaphore> eventSemaphore;
    bool update();
    void postEvent(std::unique_ptr<Event> event);
    void addListener(EventType eventType, EventSubscriber& eventSubscriber);
};

#endif
