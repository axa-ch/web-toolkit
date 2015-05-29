(($) ->

  # Public class definition
  class Tab

    constructor: (element, options) ->
      @$element = $ element
      # @options = $.extend {}, options

      @$toggles = @$element.find '[data-tab-toggle]'
      @$toggles.on 'click', @, (event) ->
        event.data.toggle event
      
      defaultSelector = @$element.data 'tab-default'
      @setActiveTab defaultSelector
      
    toggle: (event) ->
      $toggle = $ event.target
      selector = $toggle.data 'tab-toggle'
      @setActiveTab selector
    
    setActiveTab: (tabName) ->
      if @activeTabName == tabName
        return
      @activeTabName = tabName
      if @$activeContentPanel?
#        @$activeContentPanel.toggleClass 'is-active'
        @$activeContentPanel.slideToggle 'fast', () ->
          $(@).toggleClass 'is-active'
      if @$activeToggle?
        @$activeToggle.toggleClass 'is-active'

      @$activeContentPanel = @$element.find('[data-tab-content=\'' + tabName + '\']')
      @$activeToggle = @$element.find('[data-tab-toggle=\'' + tabName + '\']')
      
#      @$activeContentPanel.toggleClass 'is-active'
      @$activeContentPanel.slideToggle 'fast', () ->
        $(@).toggleClass 'is-active'
      @$activeToggle.toggleClass 'is-active'

  # DATA-API
  $(window).on 'load', () ->
    $('[data-tab]').each (index, element) ->
      new Tab(element)

)(jQuery)

#! Copyright AXA Versicherungen AG 2015
