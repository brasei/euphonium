class GeneralSettingsPlugin : Plugin
    def init()
        self.apply_default_values()
        self.name = "general"
        self.theme_color = "#1DB954"
        self.display_name = "General"
        self.type = "system"
    end

    def make_form(ctx, state)
        ctx.create_group('general', { 'label': 'General' })
        var default_name = "Euphonium"
        if core.platform() == "esp32"
            default_name = util.generate_device_name()
        end
        ctx.text_field('deviceName', {
            'label': "Device name",
            'default': default_name,
            'group': 'general'
        })
       
    end
    def set_hostname()
        if core.platform() == "esp32"
            var hn = util.to_hostname(self.config_value('deviceName'))
            print("setting hostname to ", hn)
            wifi.set_hostname(hn)
        end
    end

    def set_mdns()
        if core.platform() == "esp32"
            var hn = util.to_hostname(self.config_value('deviceName'))
            print("setting mdns name to ", hn)
            _register_mdns(hn)
        end
    end
end

euphonium.register_plugin(GeneralSettingsPlugin())
