# frozen_string_literal: true

module ReactBundling
  module Helpers
    def self.included(base)
      base.before_action :set_default_react_bundles
      base.helper_method :react_bundles_to_render
    end

    def render_react_bundle(*bundles)
      @react_bundles += bundles
    end

    def react_bundles_to_render
      @react_bundles
    end

    def set_default_react_bundles
      @react_bundles = %w[client-bundle]
    end
  end
end
