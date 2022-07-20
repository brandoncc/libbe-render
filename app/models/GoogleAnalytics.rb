# frozen_string_literal: true

module GoogleAnalytics
  module Helpers
    def self.included(base)
      base.helper_method :enable_google_analytics?, :google_analytics
    end

    def enable_google_analytics?
      @render_google_analytics != false
    end

    def disable_google_analytics!
      @render_google_analytics = false
    end

    def google_analytics
      # This is how it is setup on Lumera
      # path = Rails.root.join("app", "views", "google_analytics")
      # out  = File.read(File.join(path, "every.html"))
      # out  << File.read(File.join(path, "product_detail.html")) if product_detail_page?
      # out  << File.read(File.join(path, "cart.html")) if order_cart_page?
      # out  << render(template: "google_analytics/confo", layout: nil) if order_confo_page?
      # out.html_safe
    end
  end
end
